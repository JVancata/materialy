import { writeFile, readFile } from 'node:fs/promises'
import { responseSchema, type MarketResponse } from "./responseSchema.ts";

const STEAM_STICKERS_API_CACHE_PATH = process.env.STEAM_STICKERS_API_CACHE_PATH;
const dataCacheFile = `${STEAM_STICKERS_API_CACHE_PATH}/cache.json`;
const lastUpdatedCacheFile = `${STEAM_STICKERS_API_CACHE_PATH}/last-updated.txt`;

if (!STEAM_STICKERS_API_CACHE_PATH) {
    console.error("No STEAM_STICKERS_API_CACHE_PATH .env value specified! Killing process...");
    process.exit(1);
}

const readCacheFile = async (): Promise<CacheData | null> => {
    try {
        const rawData = (await readFile(dataCacheFile)).toString();
        const rawLastUpdated = (await readFile(lastUpdatedCacheFile)).toString();

        const parsedData: MarketResponse = await responseSchema.parseAsync(JSON.parse(rawData))
        const lastUpdated = new Date(rawLastUpdated)

        if (Number.isNaN(lastUpdated.getTime())) {
            throw Error("Invalid date in cache!");
        }

        return { marketData: parsedData, lastUpdated };
    }
    catch (error) {
        console.log("Error reading cache files", error);
        return null;
    }
}

const writeCacheFile = async ({ marketData: data, lastUpdated }: CacheData): Promise<boolean> => {
    try {
        await writeFile(dataCacheFile, JSON.stringify(data));
        await writeFile(lastUpdatedCacheFile, lastUpdated.toISOString());

        return true;
    }
    catch (error) {
        console.log("Error writing cache files", error);
        return false;
    }
}

type CacheData = {
    marketData: MarketResponse,
    lastUpdated: Date
}

export type Cache = {
    data: Readonly<CacheData | null>,
    writeCache: typeof writeCacheFile,
    readCache: typeof readCacheFile,
    setupCache: () => Promise<void>,
}


export const cache: Cache = {
    data: null,
    writeCache: async function (data: CacheData) {
        this.data = data
        return await writeCacheFile(data)
    },
    readCache: async function () {
        const data = await readCacheFile()
        this.data = data
        return data
    },
    setupCache: async function () {
        this.data = await readCacheFile()
    }
}
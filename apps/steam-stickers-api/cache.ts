import { writeFile, readFile } from 'node:fs/promises'
import { defaultMarketResponse, responseSchema, type MarketResponse } from './const.ts';

const STEAM_STICKERS_API_CACHE_PATH = process.env.STEAM_STICKERS_API_CACHE_PATH
const dataCacheFile = `${STEAM_STICKERS_API_CACHE_PATH}/cache.json`;
const lastUpdatedCacheFile = `${STEAM_STICKERS_API_CACHE_PATH}/last-updated.txt`;

const assertValidCacheEnv = () => {
    if (!STEAM_STICKERS_API_CACHE_PATH) {
        console.error("No STEAM_STICKERS_API_CACHE_PATH .env value specified! Killing process...");
        process.exit(1);
    }
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

const cacheDataExists = async (): Promise<boolean> => {
    try {
        await readFile(dataCacheFile);
        await readFile(lastUpdatedCacheFile);

        return true;
    }
    catch (error) {
        return false;
    }
}

const fillCacheFileWithDefaultData = async (): Promise<boolean> => {
    return await writeCacheFile({ marketData: defaultMarketResponse, lastUpdated: new Date() });
}

const setupCacheFile = async (): Promise<void> => {
    const cacheExists = await cacheDataExists();

    if (!cacheExists) {
        console.log("Cache does not yet exist, filling it with default data...");
        const isSuccess = await fillCacheFileWithDefaultData()

        if (!isSuccess) {
            process.exit(1);
        }
    };

    const cacheData = await readCacheFile()
    if (cacheData === null) {
        console.log("Cache contained invalid data, filling it with default data...")
        await fillCacheFileWithDefaultData();
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
        assertValidCacheEnv();
        await setupCacheFile();
        this.data = await readCacheFile()
    }
}
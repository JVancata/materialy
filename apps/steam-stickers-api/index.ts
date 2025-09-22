import express from 'express'
import cors from 'cors'
import { cache } from './cache.ts'
import { type MarketResponse, responseSchema } from './const.ts';

const steamCache = cache
await steamCache.setupCache();

const app = express()
const port = 3000

const marketDownloader = async () => {
    // Too lazy to implement the pagination correctly
    const urlsToFetch = [
        "https://steamcommunity.com/market/search/render/?query=&start=0&count=10&search_descriptions=0&sort_column=popular&sort_dir=desc&appid=730&category_730_ItemSet%5B%5D=any&category_730_ProPlayer%5B%5D=any&category_730_StickerCapsule%5B%5D=tag_crate_sticker_pack02&category_730_Tournament%5B%5D=any&category_730_TournamentTeam%5B%5D=any&category_730_Type%5B%5D=any&category_730_Weapon%5B%5D=any&norender=1",
        "https://steamcommunity.com/market/search/render/?query=&start=10&count=10&search_descriptions=0&sort_column=popular&sort_dir=desc&appid=730&category_730_ItemSet%5B%5D=any&category_730_ProPlayer%5B%5D=any&category_730_StickerCapsule%5B%5D=tag_crate_sticker_pack02&category_730_Tournament%5B%5D=any&category_730_TournamentTeam%5B%5D=any&category_730_Type%5B%5D=any&category_730_Weapon%5B%5D=any&norender=1"
    ]

    try {
        const responses: MarketResponse[] = []
        for (const url of urlsToFetch) {
            console.log("fetching", url)
            const marketDataResponse = await fetch(url);
            const marketData = await responseSchema.parseAsync(await marketDataResponse.json());
            responses.push(marketData);
        }

        const mergedResponse: MarketResponse = responses.reduce((previousValue, currentValue) => {
            return { ...previousValue, results: [...previousValue.results, ...currentValue.results] }
        })

        console.log("This is the merged response");
        console.log(mergedResponse);
    }
    catch (error) {
        console.error("Error while fetching Steam market data", error)
    }

}

app.use(cors())

app.get('/', (_req, res) => {
    if (!steamCache?.data?.marketData) {
        res.status(500).send("Server error");
        return;
    }

    res.json(steamCache.data.marketData)
})

app.listen(port, () => {
    console.log(`steam-stickers-api running on port ${port}`)
})

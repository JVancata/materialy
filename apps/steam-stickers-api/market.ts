import { responseSchema, type MarketResponse } from "./responseSchema.ts";

export const getMarketData = async (): Promise<MarketResponse | null> => {
    // Too lazy to implement the pagination correctly
    const urlsToFetch = [
        "https://steamcommunity.com/market/search/render/?query=&start=0&count=10&search_descriptions=0&sort_column=popular&sort_dir=desc&appid=730&category_730_ItemSet%5B%5D=any&category_730_ProPlayer%5B%5D=any&category_730_StickerCapsule%5B%5D=tag_crate_sticker_pack02&category_730_Tournament%5B%5D=any&category_730_TournamentTeam%5B%5D=any&category_730_Type%5B%5D=any&category_730_Weapon%5B%5D=any&norender=1",
        "https://steamcommunity.com/market/search/render/?query=&start=10&count=10&search_descriptions=0&sort_column=popular&sort_dir=desc&appid=730&category_730_ItemSet%5B%5D=any&category_730_ProPlayer%5B%5D=any&category_730_StickerCapsule%5B%5D=tag_crate_sticker_pack02&category_730_Tournament%5B%5D=any&category_730_TournamentTeam%5B%5D=any&category_730_Type%5B%5D=any&category_730_Weapon%5B%5D=any&norender=1"
    ]

    try {
        const responses: MarketResponse[] = []
        for (const url of urlsToFetch) {
            const marketDataResponse = await fetch(url);
            const marketData = await responseSchema.parseAsync(await marketDataResponse.json());
            responses.push(marketData);
        }

        const mergedResponse: MarketResponse = responses.reduce((previousValue, currentValue) => {
            return { ...previousValue, results: [...previousValue.results, ...currentValue.results] }
        })

        return mergedResponse;
    }
    catch (error) {
        console.error("Error while fetching Steam market data", error)
        return null;
    }
}

import z from "zod";

const assetDescriptionSchema = z.object({
    "appid": z.number(),
    "classid": z.string(),
    "instanceid": z.string(),
    "background_color": z.string(),
    "icon_url": z.string(),
    "tradable": z.number(),
    "name": z.string(),
    "name_color": z.string(),
    "type": z.string(),
    "market_name": z.string(),
    "market_hash_name": z.string(),
    "commodity": z.number()
})

const itemSchema = z.object({
    name: z.string(),
    hash_name: z.string(),
    sell_listings: z.number(),
    sell_price: z.number(),
    sell_price_text: z.string(),
    app_icon: z.string(),
    app_name: z.string(),
    asset_description: assetDescriptionSchema,
    sale_price_text: z.string(),
})

export const responseSchema = z.object({
    success: z.boolean(),
    start: z.number(),
    pagesize: z.number(),
    total_count: z.number(),
    searchdata: z.object({
        query: z.string(),
        search_descriptions: z.boolean(),
        total_count: z.number(),
        pagesize: z.number(),
        prefix: z.string(),
        class_prefix: z.string(),
    }),
    results: z.array(itemSchema)
})

export type MarketResponse = z.infer<typeof responseSchema>;

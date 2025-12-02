export type Stock = {
    ticker: string,
    name: string,
    price: number,
    currency: "USD" | "CZK"
}

export const initialStocksData: Stock[] = [
    { ticker: "AAPL", name: "Apple Inc.", price: 236.7, currency: "USD" },
    { ticker: "MSFT", name: "Microsoft Corporation", price: 515.36, currency: "USD" },
    { ticker: "CEZ", name: "ČEZ, a.s.", price: 1267.36, currency: "CZK" },
    { ticker: "RBLX", name: "Roblox corporation", price: 137.25, currency: "USD" },
    { ticker: "U", name: "Unity Software Inc.", price: 46.53, currency: "USD" },
    { ticker: "EA", name: "Electronics Arts", price: 202.62, currency: "USD" },
]

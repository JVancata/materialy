import express from 'express'
import cors from 'cors'
import { initialStocksData } from './const.ts'
import { getRandomPriceMultiplier } from './getRandomPriceMultiplier.ts'

const STOCK_MANIPULATION_INTERVAL_MS = 2000;
const app = express()
const port = 3000

const stocks = initialStocksData;
const tickers = stocks.map((stock) => stock.ticker);

const manipulateStocks = () => {
    stocks.forEach((stock) => {
        const priceMultiplier = getRandomPriceMultiplier();
        const newPrice = stock.price * priceMultiplier
        const roundedPrice = Math.round(newPrice * 100) / 100

        stock.price = roundedPrice;
    })
}

manipulateStocks();
setInterval(manipulateStocks, STOCK_MANIPULATION_INTERVAL_MS)

app.use(cors())

app.get('/', (_req, res) => {
    const dataWithoutPrice = stocks.map((stock) => {
        const { price, currency, ...rest } = stock;
        return rest
    });

    res.json(dataWithoutPrice)
})

app.get('/stock/:ticker', (req, res) => {
    const { ticker: paramTicker } = req.params

    if (!paramTicker || typeof paramTicker !== "string") {
        res.status(400).send("Invalid ticker");
        return;
    }

    const ticker = paramTicker.toUpperCase().trim();

    if (!tickers.includes(ticker)) {
        res.status(404).send("No ticker found");
        return;
    }

    res.json(stocks.find((stock) => stock.ticker === ticker))
})


app.listen(port, () => {
    console.log(`stock-price-api running on port ${port}`)
})

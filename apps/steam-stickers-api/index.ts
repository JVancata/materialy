import express from 'express'
import cors from 'cors'
import { cache } from './cache.ts'
import { getMarketData } from './market.ts';
import { getShouldRunDataUpdate } from './util/getShouldRunDataUpdate.ts';
import { INTERVAL_PADDING_MS, RUN_INTERVAL_MS } from './const.ts';

const steamCache = cache;
await steamCache.setupCache();

const app = express();
const port = 3000;

const updateData = async () => {
    const shouldRun = getShouldRunDataUpdate(steamCache.data?.lastUpdated);
    if (!shouldRun) {
        console.log("Update should not run yet, waiting...");
        return
    };

    console.log("Running data update...")
    const marketData = await getMarketData();

    if (!marketData) {
        console.error("No market data was fetched, will try the next time...");
        return
    };

    const now = new Date();
    await steamCache.writeCache({ marketData, lastUpdated: now })

    console.log(`Data updated at ${now.toISOString()} goodbye. Waiting...`);
}

updateData();
setInterval(updateData, RUN_INTERVAL_MS + INTERVAL_PADDING_MS);

app.use(cors())

app.get('/', (_req, res) => {
    if (!steamCache?.data?.marketData) {
        res.status(500).send("Server error");
        return;
    }

    res.json(steamCache.data.marketData);
});

app.listen(port, () => {
    console.log(`steam-stickers-api running on port ${port}`);
});

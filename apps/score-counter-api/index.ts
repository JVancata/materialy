import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

let score = 0n;

app.get('/', (_req, res) => {
    res.send(score.toString());
})

app.post("/add", (req, res) => {
    const previousScoreString = score.toString();

    if (!req.body) {
        res.send(previousScoreString);
        return;
    }

    const { value } = req.body;
    if (!value) {
        res.send(previousScoreString);
        return;
    }

    if (typeof value !== "number" || !Number.isSafeInteger(value)) {
        res.send(previousScoreString);
        return;
    }

    score += BigInt(value);
    res.send(score.toString());
    return;
})

app.post("/", (_req, res) => {
    score += 1n
    const scoreString = score.toString();

    res.send(scoreString);
    return;
})

app.listen(port, () => {
    console.log(`score-counter-api running on port ${port}`)
})

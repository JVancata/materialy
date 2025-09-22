import express from 'express'
import cors from 'cors'
import { sounds } from './const.ts'

const app = express()
const port = 3000

app.use(cors())

app.use(express.static('public'))

app.get('/', (_req, res) => {
    res.json(sounds)
})

app.listen(port, () => {
    console.log(`soundboard-api running on port ${port}`)
})

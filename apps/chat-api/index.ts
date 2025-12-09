import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

type Message = {
    username: string,
    message: string
}

const messages: Message[] = [];

app.get('/', (_req, res) => {
    res.json(messages);
})

app.post("/", (req, res) => {
    const contentTypeHeader = req.headers["content-type"];
    if (contentTypeHeader !== "application/json") {
        res.status(415);
        res.send('Error: Content-Type must be "application/json"')
        return;
    }

    const { username, message } = req.body;
    if (!username || !message) {
        res.status(422);
        res.send('Error: Body of the request is not complete, correct value is: {"username": "User", "message": "Hello!"}');
        return;
    }

    if (typeof username !== "string" || typeof message !== "string") {
        res.status(422);
        res.send("Error: Username and message have to be a string");
        return;
    }

    messages.push({ username, message });

    res.json(messages);
    return;
})

app.listen(port, () => {
    console.log(`chat-api running on port ${port}`)
})

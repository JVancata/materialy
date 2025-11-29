import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

const FLAG = process.env.CTF_1_FLAG;

if (!FLAG) {
    console.error("No CTF_1_FLAG .env value specified! Killing process...");
    process.exit(1);
}

app.get('/', (_request, response) => {
    response.send('Poslal*a si GET request. Musíš poslat POST request s tělem { "input": "string" }.');
})

app.post('/', (request, response) => {
    const input = request.body.input;

    if (!input || !input.length) {
        response.send('Tělo musí být { "input": "string" }. Maximální délka vstupu je pět znaků.');
        return;
    };

    if (input.length > 5) {
        response.send(`Sorry, input je delší než pět znaků. Tvůj vstup je "${input}"`);
        return;
    }

    if (input.toString().length <= 5) {
        response.send(`Sorry, musíš poslat input delší než pět znaků. Tvůj vstup je "${input}"`);
        return;
    }

    response.send(`${FLAG}`);
    return;
})

app.listen(port, () => {
    console.log(`ctf-1 running on port ${port}`)
})

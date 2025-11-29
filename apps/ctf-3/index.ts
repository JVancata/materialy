import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

const FLAG = process.env.CTF_3_FLAG;

if (!FLAG) {
    console.error("No CTF_3_FLAG .env value specified! Killing process...");
    process.exit(1);
}

app.get('/', (_request, response) => {
    response.send('Poslal*a si GET request. Musíš poslat POST request s tělem { "input": "string" }, aby si ověřil*a vlajku.');
})

app.post('/', (request, response) => {
    const input = request.body.input;

    if (!input || !(typeof input === "string")) {
        response.send('Tělo musí být { "input": "string" }, aby si ověřil*a vlajku.');
        return;
    };

    if (input === FLAG) {
        response.send(`✅ Výborně!`);
        return;
    }

    response.send(`❌ Zkoušej to dál...`);
    return;
})

app.listen(port, () => {
    console.log(`ctf-3 running on port ${port}`)
})

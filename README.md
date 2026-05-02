# Local run
Node v24
`npm install`
`npm run dev`

# Docker
`docker compose build && docker compose up`

## Single dockerfile build and run
use the docker commands in package.json
`npm run docker:build && npm run docker:run`

or run it manually via

`docker build -t your-tag .`
`docker run -p 127.0.0.1:3000:3000 your-tag`



## Docker on server
`docker compose build && docker compose up --detach`

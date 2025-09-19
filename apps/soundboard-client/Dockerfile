FROM node:24.8-alpine AS build

COPY package.json .
RUN npm install

COPY . .

ARG VITE_SOUNDBOARD_API_URL

RUN npm run build

FROM nginx:alpine AS serve
COPY --from=build ./dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build:node:ssr

FROM keymetrics/pm2:14-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY --from=0 /app/build/ /app/build/
COPY ecosystem.yml .
COPY package.json .

CMD pm2-runtime start ecosystem.yml
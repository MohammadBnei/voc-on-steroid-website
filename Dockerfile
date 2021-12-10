FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build:node

FROM keymetrics/pm2:14-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY --from=0 /app/ /app/

CMD pm2-runtime start ecosystem.yml
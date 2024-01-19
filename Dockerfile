FROM node:lts-alpine

WORKDIR /usr/src
COPY . .

RUN apk add chromium

RUN npm ci

CMD ["node", "src/index.js"]

FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /usr/src

COPY . .

RUN npm ci

CMD ["node", "src/index.js"]

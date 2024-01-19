FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /home/pptruser/app

COPY . .

RUN npm ci

CMD ["node", "src/index.js"]

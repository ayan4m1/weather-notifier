FROM node:lts

WORKDIR /usr/src
COPY . .

RUN npm ci

CMD ["node", "src/index.js"]

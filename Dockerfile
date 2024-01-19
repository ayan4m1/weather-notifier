FROM node:lts

RUN apt-get update

RUN apt-get install -y libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2

WORKDIR /usr/src

COPY . .

RUN npm ci \
    && groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser ./node_modules \
    && chown -R pptruser:pptruser ./package.json \
    && chown -R pptruser:pptruser ./package-lock.json

USER pptruser

CMD ["node", "src/index.js"]

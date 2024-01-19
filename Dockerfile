FROM node:lts

RUN sudo apt install libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2

WORKDIR /usr/src

COPY . .

RUN npm ci

CMD ["node", "src/index.js"]

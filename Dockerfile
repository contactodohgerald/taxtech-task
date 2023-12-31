FROM node:16-alpine as development

WORKDIR /usr/src/app

COPY package*.json .

RUN yarn install

COPY . .

CMD ["node", "dist/server.js"]
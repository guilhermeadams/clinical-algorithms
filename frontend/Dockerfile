FROM node:lts-alpine as global-deps-stage
RUN npm i -g @quasar/cli@latest

FROM global-deps-stage as develop-stage
WORKDIR /src
COPY package.json ./
COPY yarn.lock ./
COPY . .

FROM develop-stage as build-spa-stage
RUN yarn
RUN quasar build -m spa

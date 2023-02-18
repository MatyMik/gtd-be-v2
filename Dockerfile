FROM node:alpine AS build

WORKDIR /usr/src/app
COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .
RUN npm start
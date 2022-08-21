FROM node:16.7.0-alpine3.11

ENV NODE_ENV="development"

RUN npm install -g npm@8.18.0

WORKDIR /app/

COPY app/package.json package.json

RUN npm install yarn
RUN yarn install

CMD yarn start

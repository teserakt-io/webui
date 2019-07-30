FROM node:12-alpine

WORKDIR /app/

RUN apk add --no-cache python

COPY package*.json ./

RUN npm install

COPY . .
RUN cp .env.example .env

RUN npm run build

EXPOSE 3000
VOLUME /app/env.js

CMD ["npm", "run", "start"]

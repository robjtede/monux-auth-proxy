FROM node:lts-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY server.js .
EXPOSE 8977
CMD [ "node", "server.js" ]

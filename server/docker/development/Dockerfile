FROM node:alpine

WORKDIR /app

COPY server/package.json /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
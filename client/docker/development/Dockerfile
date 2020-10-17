FROM node:alpine

WORKDIR /app

COPY client/package.json /app

RUN npm install

EXPOSE 80

CMD ["npm", "run", "start"]
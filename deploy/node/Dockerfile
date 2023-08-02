FROM node:latest

WORKDIR /usr/src/app

COPY packeage*.json ./

RUN npm install

COPY ./ ./

RUN npm run dev

CMD ["npm", "start"]

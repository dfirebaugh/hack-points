# create a file named Dockerfile
FROM node:latest

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install


COPY . /app
RUN npm run build

ENV MONGO_URI=mongodb://hack-points-db:27017/hackerpoints

EXPOSE ${PORT}

CMD ["node", "app.js"]

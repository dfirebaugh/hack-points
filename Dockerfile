# create a file named Dockerfile
FROM node:10

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

EXPOSE 80

CMD ["npm", "run","dev"]

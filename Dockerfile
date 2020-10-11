FROM golang:1.15 as backend-build

WORKDIR /hackpoints
COPY server/ .

RUN go mod vendor
RUN go build -o server

# create a file named Dockerfile
# FROM node:latest as frontend-build

# WORKDIR /app

# COPY package.json /app
# RUN npm install


# COPY . /app
# RUN npm run build

# ENV MONGO_URI=mongodb://hack-points-db:27017/hackerpoints

# EXPOSE 3000

# CMD ["tail", "-f", "/dev/null"]

# copy from build environments
FROM node:latest

WORKDIR /app

COPY --from=backend-build /hackpoints/server .

ENTRYPOINT [ "./server" ]
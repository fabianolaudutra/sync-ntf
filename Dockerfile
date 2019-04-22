FROM node:8-alpine

LABEL organization: "sync"
LABEL maintainer: "fabianolaudutra@gmail.com"
LABEL version: "1.0"

RUN apk update && apk upgrade && apk add --no-cache bash git openssh

WORKDIR /app

ADD client /app/client
ADD server /app/server
ADD package.json /app
ADD package-lock.json /app
RUN npm install

EXPOSE 3050

CMD ["npm","start"]
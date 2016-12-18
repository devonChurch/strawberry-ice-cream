FROM node:6.9.2

MAINTAINER Devon Church

ENV CONTAINER_PATH /usr/app

RUN mkdir $CONTAINER_PATH

WORKDIR $CONTAINER_PATH

COPY package.json $CONTAINER_PATH

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "run", "express:start"]

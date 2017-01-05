FROM node:6.9.2

MAINTAINER Devon Church

ENV CONTAINER_PATH /usr/app
WORKDIR $CONTAINER_PATH

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p $CONTAINER_PATH && cp -a /tmp/node_modules $CONTAINER_PATH

EXPOSE 80

ENTRYPOINT ["npm", "run", "express:start:production"]

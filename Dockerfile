FROM node:6.9.2

MAINTAINER Devon Church

ENV CONTAINER_PATH /usr/app
WORKDIR $CONTAINER_PATH
RUN mkdir -p $CONTAINER_PATH

COPY ./package.json $CONTAINER_PATH
RUN cd $CONTAINER_PATH \
	&& npm install --production

COPY ./dist $CONTAINER_PATH/dist

EXPOSE 80

ENTRYPOINT ["npm", "start"]

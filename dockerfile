FROM node:16
LABEL maintainer="Min"

WORKDIR /app
COPY ./ /app

RUN yarn install
EXPOSE 3000

CMD [ "nodemon","server.js" ]
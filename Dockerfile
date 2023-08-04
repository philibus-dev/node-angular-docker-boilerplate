FROM node:alpine

WORKDIR /Boilerplate
COPY ./webapp ./webapp
COPY ./nodeJS ./nodeJS
RUN cd /Boilerplate/webapp && npm ci && npm run build
RUN cd /Boilerplate/nodeJS && npm ci
RUN rm /Boilerplate/webapp -rf

EXPOSE 8080

CMD cd /Boilerplate/nodeJS && npm start

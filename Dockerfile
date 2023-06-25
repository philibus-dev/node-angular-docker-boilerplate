FROM node:18.16.0

WORKDIR /Boilerplate
COPY ./webapp ./webapp
COPY ./nodeJS ./nodeJS
RUN cd /Boilerplate/webapp && npm install && npm run build
RUN cd /Boilerplate/nodeJS && mkdir keys && npm install
RUN rm /Boilerplate/webapp -rf

EXPOSE 8080

CMD cd /Boilerplate/nodeJS && npm start

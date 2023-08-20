# Node Angular Docker - Boilerplate

Boilerplate with everything connected.

## Installation

Use Node version v18.10 (if you use Node Version Manager)

`nvm install v18.10` then `nvm use v18.10`

`cd nodeJS` and then `npm install`.

`cd webapp` and then `npm install`.

## Start the Server and the Angular Application

Start the server (uses port 8080):

`cd nodeJS`

`npm run start`

Run Angular:

`cd webapp`

`npm run start`

## Run Project Inside Docker Container

Docker will connect to the MongoDB database, start NodeJS and start the Angular application.

1. Install Docker: `https://docs.docker.com/get-docker/`.  Then run that Docker client.

2. From the root directory, run the following command to create the images for MongoDB and the Javascript application: `docker-compose build`. This runs everything in the `docker-compose.yml` file.

3. Run `docker-compose up` which will pull the images, create containers for them, creates volumes, and finally runs the container. You can instead run `docker-compose up -d` as "detatched" and behind the scenes, without logs and without a terminal window.

4. Open a browser and go to `localhost`. No port necessary.

## Run MongoDB Locally

1. Run MongoDB UI/client/editor, and make a connection to `mongodb://localhost:2717`. This port forwarding is in the `docker-compose.yml`. The entire connection string is: `mongodb://admin:admin@localhost:2717/?authMechanism=DEFAULT`

2. Open a browser and go to ??
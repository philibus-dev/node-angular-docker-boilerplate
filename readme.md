# MEAN Boilerplate with Authentication and Containers

Boilerplate with everything needed for a full stack authenticated web application.  Angular v16, Node v18 with Express, MongoDB with Mongoose, Authentication with Auth0, and "Containerized" with Docker.

## Installation

Use Node version v18.10 (if you use Node Version Manager)

`nvm install v18.10` then `nvm use v18.10`

`cd nodeJS` and then `npm install`.

`cd webapp` and then `npm install`.

## Start the Server and the Angular Application Locally

Start the server (uses port 8080):

`cd nodeJS`

`npm run start`

Run Angular:

`cd webapp`

`npm run start`

## Sign Up for Auth0

And then copy over "Domain", "Client ID" and "Client Secret" from the Application page after you create your account.

IMPORTANT!  Don't forget `https://` in the beginning of "Domain"

## Setup for Running Project Inside Docker Container

Docker will connect to the MongoDB database, start NodeJS and start the Angular application.

An example `docker-compose.yml` file has been provided, but you will need to populate it with your own credentials provided from Auth0, specifically:
- AUTHO_CLIENT_ID=<AUTH0 clientId>
- AUTHO_SECRET=<AUTH0 secret>
- AUTHO_DOMAIN=<AUTH0 domain>

1. Install Docker: `https://docs.docker.com/get-docker/`.  Then run that Docker client.

2. From the root directory, run the following command to create the images for MongoDB and the Javascript application: `docker-compose build`. This runs everything in the `docker-compose.yml` file.

 - Note: if you have a different Docker Compose file than `docker-compose.yml`, use `-f` like so:
```
docker-compose -f docker-compose-local.yml build
```

 - Likewise, if you are using a different file, use the `-f` here for `up` as well:
 ```
 docker-compose -f docker-compose-local.yml up
 ```

  - Tip: If you just make a change to the above .yml file, you can just `down` and then `up`, instead of doing another `build` and then `up`.  "Build" compiles all your application code into a container.  So if it's the same, you don't need to compile again.

3. Run `docker-compose up` which will pull the images, create containers for them, creates volumes, and finally runs the container. You can instead run `docker-compose up -d` as "detatched" mode, which will run it behind the scenes, without logs and without displaying everything to the terminal window.

4. Open a browser and go to `localhost`. No port number necessary.

5. When running in production in "detached" mode with `-d`, use the following command to stop the container:
```
docker compose down
```

 - Tip: to see all running Docker containers, run 
 ```
 docker ps
 ```

## Run MongoDB Locally

1. Run MongoDB UI/client/editor, and make a connection to `mongodb://localhost:2717`. This port forwarding is in the `docker-compose.yml`. The entire connection string is: `mongodb://admin:admin@localhost:2717/?authMechanism=DEFAULT`.

2. Open a browser and go to `http://localhost:4200/`.

## Unit Tests Coverage

Unit Tests are written in `*.spec.ts` files, and use `Karma`, `Jasmine`, and `Mocha`.

Run test coverage reports from the `nodejs` and `webapp` folders by running
```
npm run  test-report
```

After running the above commands, a coverage HTML file will be created in the respective folder for you to view.  For instance, running a test-report in the `webapp` folder will create an `index.html` file in a folder like this:
```
node-angular-docker-boilerplate/webapp/coverage/Chrome Headless 116.0.5845.96 (Mac OS 10.15.7)
```

(The folder name in the above example will differ from yours depending on what version of Chrome you are using)
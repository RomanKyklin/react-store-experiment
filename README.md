# react-store-experiment
Local start without docker: 

1) clone this repository

2) go to the client folder and run npm install && npm run-script build

3) go to the server folder and run npm install 

4) in the .env file change mode to "DEVELOPMENT" and run node server.js or nodemon server.js

5) The project will run at localhost:4000

Local start with docker: 

1) clone this repository

2) go to the project folder and run docker-compose build && docker-compose up -d

3) The project will run at localhost:4000

Features: state management with Redux, authentication with passport.js local strategy, server routing with express, 
client routing with react-router v4, mongoDB with mongoose as database, 

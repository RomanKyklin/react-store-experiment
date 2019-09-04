FROM node:latest

# Creating app directory
RUN mkdir -p /usr/src/backend-app/client
WORKDIR /usr/src/backend-app/client

COPY package.json /usr/src/backend-app/client

RUN npm install

COPY . /usr/src/backend-app/client

RUN npm run-script build

CMD ["npm", "start"]
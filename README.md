# Udacity StoreFront Project

This project is the second project in Udacity Full-Stack Advanced JS Nanodegree.

## Requirements

[REQUIREMENTS.md](REQUIREMENTS.md)

Build a JavaScript API based on a requirements given by the stakeholders. You will architect the database, tables, and columns to fulfill the requirements. Create a RESTful API to be accessible to the frontend developer. You will also have written test, secured user information with encryption, and provide tokens for integration into the frontend.
## Built With
![TypeScript](https://img.shields.io/static/v1?style=for-the-badge&message=TypeScript&color=3178C6&logo=TypeScript&logoColor=FFFFFF&label=)
![ts-node](https://img.shields.io/static/v1?style=for-the-badge&message=ts-node&color=3178C6&logo=ts-node&logoColor=FFFFFF&label=)
![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![Express](https://img.shields.io/static/v1?style=for-the-badge&message=Express&color=000000&logo=Express&logoColor=FFFFFF&label=)
![Nodemon](https://img.shields.io/static/v1?style=for-the-badge&message=Nodemon&color=222222&logo=Nodemon&logoColor=76D04B&label=)
![Prettier](https://img.shields.io/static/v1?style=for-the-badge&message=Prettier&color=222222&logo=Prettier&logoColor=F7B93E&label=)
![ESLint](https://img.shields.io/static/v1?style=for-the-badge&message=ESLint&color=4B32C3&logo=ESLint&logoColor=FFFFFF&label=)
![Jasmine](https://img.shields.io/static/v1?style=for-the-badge&message=Jasmine&color=8A4182&logo=Jasmine&logoColor=FFFFFF&label=)
![Jest](https://img.shields.io/static/v1?style=for-the-badge&message=Jest&color=C21325&logo=Jest&logoColor=FFFFFF&label=)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## Installation

To install the necessary packages, run:

```bash
npm install
#or
yarn
```

## Scripts
```python
# Watch:
npm run watch
    "watch": "tsc-watch --esModuleInterop src/server.ts --outDir ./dist --onSuccess \"node ./dist/server.js\"",

# Migrations:
npm run migrate:up
    "migrate:up": "db-migrate up",

npm run migrate:down
    "migrate:down": "db-migrate down",

# Test:
npm run test
    "test": "cross-env NODE_ENV=test jasmine-ts \"src/**/*Spec.ts\"",
```

## Usage
```
  1. create database called store
  2. create environment variables (".env") and add the information required from (".env-template")
  3. run the following commands:
```

```
$ git clone https://github.com/AbdElrahmanGbr/storefront-backend-udacity.git
$ cd storefront-backend-udacity;
$ npm install
$ npx db-migrate up
$ npm run watch
$ npm run test
```

## Environement Variables
```
PG_HOST=127.0.0.1 # Postgres host
PG_DB=store_front # Postgres database
PG_DB_TEST=store_front_test # Postgres test database
PG_USER=store_front_user # Postgres user
PG_PASSWORD=password123 # Postgres database password
PG_PORT=5432 # Postgres port
BCRYPT_PASSWORD=any-strong-password
SALT_ROUNDS=10
TOKEN_SECRET=keep-it-secret-keep-it-safe # JWT

PORT=4040 # app running port
```

## Main Steps to Run
### clone the project
```bash
git clone https://github.com/AbdElrahmanGbr/storefront-backend-udacity.git
```
## Go to the project directory
cd storefront-backend-udacity

## Install dependencies
npm i (or) yarn

## Setup Database
```
  CREATE USER store_front_user WITH PASSWORD 'password';

  CREATE DATABASE store_front

  CREATE DATABASE store_front_test

  GRANT ALL ON SCHEMA public TO store_front_user;

  \c store_front

  GRANT ALL PRIVILEGES ON DATABASE store_front TO store_front_user;

  GRANT ALL ON SCHEMA public TO store_front_user; <-- just in case

  \c store_front_test

  GRANT ALL PRIVILEGES ON DATABASE store_front_test TO store_front_user;

  GRANT ALL ON SCHEMA public TO store_front_user; <-- just in case
```

## Run The Migrations
```bash
npm run migrate:up
```
## Start the Server
```bash
npm run watch
```

## Running Tests
```bash
npm run test
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
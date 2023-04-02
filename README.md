
## Description

MyIdeasWorkcd 

## Installation

```bash
$ npm install
$ cd frontend; yarn ; cd ..
$ 
```

## Database migration
```bash
yarn run migration:generate ./src/migrations/creation
yarn run migration:run
```

## Running the app

```bash
# We need to build before every run
$ yarn build

# backend run
$ yarn backend

# frontend run
$ yarn frontend
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


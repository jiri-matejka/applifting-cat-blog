## Backend

This is a REST + Websocket backend for CatBlog app.

Start the containers with
`docker compose --env-file ./env/production.env up`

And stop them with
`docker compose --env-file ./env/production.env down`

OpenAPI documentation: [api.yml](api.yml), I did not include Swagger UI.

## Available scripts

- `build`: Creates production build
- `lint`: Lints the project
- `start-prod` Starts built project
- `dev` Starts app in dev mode, uses nodemon which restarts server after source code changes
- `test` Runs unit tests with Jest

## Tech Stack

- TypeScript
- Express server
- TypeORM
- Postgres database
- Jest

## What is missing

GraphQL server and integration tests, I don't have time left for this now. I have only two simple unit tests.

## Architecture

Routers (`routers`) contains validation of the parameters, calling business logic and returning a result to the client. Business logic is placed inside `domain`.
Business logic calls dataStore.

## What can be improved

Decouple business logic from the database by using dependency injection, which would enable unit testing of the business logic.

Adding a rate limiting with e.g. [node-rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible).

## Seeding data

There is a function `[seedUsers](src/database/seedUsers.ts)` which creates two sample users of they are not present in the database. It is called on server startup.

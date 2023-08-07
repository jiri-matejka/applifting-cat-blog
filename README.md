# Applifting Cat Blog

This is a fullstack exercise project according to https://github.com/Applifting/fullstack-exercise/blob/master/assignment.md.

Detailed frontend documentation is [here](frontend/README.md).
Detailed backend documentation is [here](backend/README.md).

## Quickstart

In both frontend (FE) and backend (BE), yarn classic is used.

### Backend

`yarn install`

Without local postgres database (this will deploy "production" build):

`docker compose --env-file ./env/production.env up`

With local postgres database:
1. check if variables in env/development.env are correct
2. `yarn dev`

Backend is running on port 3000.

### Frontend

`yarn install`

`yarn dev`



#!/bin/bash
dropdb $DATABASE_NAME
createdb $DATABASE_NAME
env-cmd .env.development node_modules/.bin/knex migrate:latest
env-cmd .env.development node_modules/.bin/knex seed:run

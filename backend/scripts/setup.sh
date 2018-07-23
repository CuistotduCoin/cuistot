#!/bin/bash
dropdb $DATABASE_NAME
createdb $DATABASE_NAME
yarn migrate
yarn seed
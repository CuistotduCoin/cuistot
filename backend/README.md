# [Cuistot du Coin](https://www.cuistotducoin.com)

## SETUP:
  - `yarn` to install dependencies
  - `yarn migrate` to apply latest migrations
  - `yarn rollback` to rollback latest applied migrations
  - `yarn seed` to seed current database
  - `yarn deploy` to deploy GraphQL api

## ENV:

`.env` contains all the needed variables for the current environment and for deployment

## STACK:
  1. API's
    * [Serverless](http://serverless.com) | Framework covering AWS Lambda.
    * [RDS](https://aws.amazon.com/fr/rds/) | Amazon PostgreSQL database instance
    * [AppSync](https://aws.amazon.com/fr/appsync/)
    * [Serverless-AppSync-Plugin](https://github.com/sid88in/serverless-appsync-plugin)

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


## PROCEDURES:

Delete the stack

- Delete the bucket
- Delete the cloud formation

Recreate user pool

- Delete the current user pool
- Set NeedsNewUserPool to true
- Deploy
- Set AWS_USERPOOL_ID with the new user pool id in .env
- Set NeedsNewUserPool to false
- Deploy again

Recreate Postgres instance

- Delete the current instance
- Set NeedsNewDBInstance to true
- Deploy
- Set NeedsNewDBInstance to false

TO DO:

- Script to create domain linked to the user pool automatically on deployment :
https://stackoverflow.com/questions/49524493/cloudformation-cognito-how-to-setup-app-client-settings-domain-and-federated?rq=1

**Need to work on this to have a cleaner process**

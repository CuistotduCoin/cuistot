# [Cuistot du Coin](https://www.cuistotducoin.com) :

[![Greenkeeper badge](https://badges.greenkeeper.io/CuistotduCoin/cuistot.svg)](https://greenkeeper.io/)
[![CircleCI](https://circleci.com/gh/CuistotduCoin/cuistot.svg?style=shield)](https://circleci.com/gh/CuistotduCoin/cuistot)

| FrontEnd | BackEnd | Admin | Email Template |
|----------|---------|-------|----------------|
| [![FrontEnd](https://david-dm.org/cuistotducoin/cuistot.svg?path=frontend)](https://david-dm.org/cuistotducoin/cuistot?path=frontend) | [![BackEnd](https://david-dm.org/cuistotducoin/cuistot.svg?path=backend)](https://david-dm.org/cuistotducoin/cuistot?path=backend) | [![Admin](https://david-dm.org/cuistotducoin/cuistot.svg?path=admin)](https://david-dm.org/cuistotducoin/cuistot?path=admin) | [![Email-Template](https://david-dm.org/cuistotducoin/cuistot.svg?path=email-templates)](https://david-dm.org/cuistotducoin/cuistot?path=email-templates) |
| [![FrontEnd](https://snyk.io/test/github/cuistotducoin/cuistot/badge.svg?targetFile=frontend/package.json)](https://snyk.io/test/github/cuistotducoin/cuistot?targetFile=frontend/package.json) | [![BackEnd](https://snyk.io/test/github/cuistotducoin/cuistot/badge.svg?targetFile=backend/package.json)](https://snyk.io/test/github/cuistotducoin/cuistot?targetFile=backend/package.json) | [![Admin](https://snyk.io/test/github/cuistotducoin/cuistot/badge.svg?targetFile=admin/package.json)](https://snyk.io/test/github/cuistotducoin/cuistot?targetFile=admin/package.json) | [![Email Templates](https://snyk.io/test/github/cuistotducoin/cuistot/badge.svg?targetFile=email-templates/package.json)](https://snyk.io/test/github/cuistotducoin/cuistot?targetFile=email-templates/package.json) |

Marketplace for Cook
  - Deployed using _Serverless_ | AWS Lambda | AWS S3.  
  - Backend API = **GraphQL** with AWS SyncApp & AWS Lambda
  - Client-side API requests are generated from **Apollo Client** wrapped components.
  - The rest of the app sits on **React.js** & **React Router*(V4)** (with Code splitting)

Getting the secrets
  - Copy the provided secrets file to the root

## SETUP:
  - [install aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
  - `npm install -g serverless`
  - `npm install -g yarn`
  - Then go to on of the directory then follow insctructions
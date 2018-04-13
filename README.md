# [Cuistot du Coin](https://www.cuistotducoin.com) :

Marketplace for Cook
  - Deployed using _Serverless_ | AWS Lambda | AWS S3.  
  - Backend API = **GraphQL** with AWS SyncApp & AWS Lambda
  - Client-side API requests are generated from **Apollo Client** wrapped components.
  - The rest of the app sits on **React.js** & **React Router*(V4)** (with Code splitting)
  
## SETUP:
  - [install aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
  - `npm install -g serverless`
  - `npm install -g yarn`
  - `npm i` || `yarn` to install dependencies
  - `npm start` for development server
  - `npm run build` for production server
 
 ## TECHNOLOGIES:
  1. ### API's
    * [Algolia](https://www.algolia.com/) | Search.
    * [MangoPay](https://www.mangopay.com/) | Payment for Marketplace.
    * [Serverless](http://serverless.com) | Framework covering AWS Lambda.
    * [AWS SES](https://aws.amazon.com/ses/) | Email Notifications.
    * [AWS SNS](https://aws.amazon.com/sns/) | Receiving Backend Push Notifications.
    * [AWS S3](https://aws.amazon.com/s3/) | Static asset hosting.
    * [AWS Route 53](https://aws.amazon.com/route53/) | DNS routing.
    * [AWS CloudFront](https://aws.amazon.com/cloudfront/) | Latency reduction via CDN.
    * [AWS Lambda](https://aws.amazon.com/lambda/) | All Backend Services.
    * [AWS Api-Gateway](https://aws.amazon.com/api-gateway/) | HTTP endpoints for Lambda services.
    * [AWS AppSync](https://aws.amazon.com/appsync/) | GraphQL.
    * [AWS Cognito](https://aws.amazon.com/cognito/) | User Management.
  2. ### Libraries & Packages
    * Uses _TypeScript_ for types with Javascript
    * Uses _Razzle_ with _After_ for universal server-rendereding
    * Uses _Apollo_ for providing API calls directly to componenents.
    * Uses _React Router (4)_ for routing.
    * Uses Jest + Enzyme for testing.

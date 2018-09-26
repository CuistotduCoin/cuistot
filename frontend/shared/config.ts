const awsExports = {
  Auth: {
    mandatorySignIn: false,
    region: process.env.AWS_REGION_IRELAND,
    userPoolId: process.env.AWS_USERPOOL_ID,
    userPoolWebClientId: process.env.AWS_APP_CLIENT_ID,
    identityPoolId: process.env.AWS_IDENTITY_POOL_ID
  },
  Storage: {
    bucket: process.env.AWS_STORE_BUCKET,
    region: process.env.AWS_REGION_IRELAND
  },
  aws_appsync_graphqlEndpoint: process.env.GRAPHQL_API_URL,
  aws_appsync_region: process.env.AWS_REGION_IRELAND,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS"
};

export { awsExports };
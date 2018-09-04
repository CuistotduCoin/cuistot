import Amplify, { Storage, Auth } from 'aws-amplify';

// window.LOG_LEVEL = 'DEBUG';

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_AWS_REGION_IRELAND,
    userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,
    identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
  },
  Storage: {
    bucket: process.env.REACT_APP_AWS_BUCKET,
    region: process.env.REACT_APP_AWS_REGION_IRELAND,
  },
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_GRAPHQL_API_URL,
  aws_appsync_region: process.env.REACT_APP_AWS_REGION_IRELAND,
  aws_appsync_authenticationType: process.env.REACT_APP_AWS_AUTHENTICATION_TYPE,
});

Storage.configure({ level: 'protected' });

export { Storage, Auth };

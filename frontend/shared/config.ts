const runtimeConfig =
  typeof window !== "undefined"
    ? {
      // @ts-ignore
      AWS_APP_CLIENT_ID: window.env.AWS_APP_CLIENT_ID,
      // @ts-ignore
      AWS_REGION_IRELAND: window.env.AWS_REGION_IRELAND,
      // @ts-ignore
      AWS_USERPOOL_ID: window.env.AWS_USERPOOL_ID,
      // @ts-ignore
      AWS_IDENTITY_POOL_ID: window.env.AWS_IDENTITY_POOL_ID,
      // @ts-ignore
      AWS_STORE_BUCKET: window.env.AWS_STORE_BUCKET,
      // @ts-ignore
      GRAPHQL_API_URL: window.env.GRAPHQL_API_URL,
      // @ts-ignore
      GUEST_USERNAME: window.env.GUEST_USERNAME,
      // @ts-ignore
      GUEST_PASSWORD: window.env.GUEST_PASSWORD,
      // @ts-ignore
      ALGOLIASEARCH_PLACES_APP_ID: window.env.ALGOLIASEARCH_PLACES_APP_ID,
      // @ts-ignore
      ALGOLIASEARCH_PLACES_KEY: window.env.ALGOLIASEARCH_PLACES_KEY,
      // @ts-ignore
      ALGOLIASEARCH_SEARCH_APP_ID: window.env.ALGOLIASEARCH_SEARCH_APP_ID,
      // @ts-ignore
      ALGOLIASEARCH_SEARCH_KEY: window.env.ALGOLIASEARCH_SEARCH_KEY
    }
    : {
      AWS_APP_CLIENT_ID: process.env.AWS_APP_CLIENT_ID,
      AWS_REGION_IRELAND: process.env.AWS_REGION_IRELAND,
      AWS_USERPOOL_ID: process.env.AWS_USERPOOL_ID,
      AWS_IDENTITY_POOL_ID: process.env.AWS_IDENTITY_POOL_ID,
      AWS_STORE_BUCKET: process.env.AWS_STORE_BUCKET,
      GRAPHQL_API_URL: process.env.GRAPHQL_API_URL,
      GUEST_USERNAME: process.env.GUEST_USERNAME,
      GUEST_PASSWORD: process.env.GUEST_PASSWORD,
      ALGOLIASEARCH_PLACES_APP_ID: process.env.ALGOLIASEARCH_PLACES_APP_ID,
      ALGOLIASEARCH_PLACES_KEY: process.env.ALGOLIASEARCH_PLACES_KEY,
      ALGOLIASEARCH_SEARCH_APP_ID: process.env.ALGOLIASEARCH_SEARCH_APP_ID,
      ALGOLIASEARCH_SEARCH_KEY: process.env.ALGOLIASEARCH_SEARCH_KEY
    };

const awsExports = {
  Auth: {
    mandatorySignIn: false,
    region: runtimeConfig.AWS_REGION_IRELAND,
    userPoolId: runtimeConfig.AWS_USERPOOL_ID,
    userPoolWebClientId: runtimeConfig.AWS_APP_CLIENT_ID,
    identityPoolId: runtimeConfig.AWS_IDENTITY_POOL_ID
  },
  Storage: {
    bucket: runtimeConfig.AWS_STORE_BUCKET,
    region: runtimeConfig.AWS_REGION_IRELAND
  },
  aws_appsync_graphqlEndpoint: runtimeConfig.GRAPHQL_API_URL,
  aws_appsync_region: runtimeConfig.AWS_REGION_IRELAND,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS"
};

export { runtimeConfig, awsExports };
const runtimeConfig =
  typeof window !== "undefined"
    ? {
        AWS_APP_CLIENT_ID: window.env.AWS_APP_CLIENT_ID,
        AWS_REGION_IRELAND: window.env.AWS_REGION_IRELAND,
        AWS_SHORT_DOMAIN: window.env.AWS_SHORT_DOMAIN,
        AWS_USERPOOL_ID: window.env.AWS_USERPOOL_ID,
        STRIPE_API: window.env.STRIPE_API,
        STRIPE_API_KEY: window.env.STRIPE_API_KEY,
        GRAPHQL_API_URL: window.env.GRAPHQL_API_URL,
        GUEST_USERNAME: window.env.GUEST_USERNAME,
        GUEST_PASSWORD: window.env.GUEST_PASSWORD,
        ALGOLIASEARCH_PLACES_APP_ID: window.env.ALGOLIASEARCH_PLACES_APP_ID,
        ALGOLIASEARCH_PLACES_KEY: window.env.ALGOLIASEARCH_PLACES_KEY,
        ALGOLIASEARCH_SEARCH_APP_ID: window.env.ALGOLIASEARCH_SEARCH_APP_ID,
        ALGOLIASEARCH_SEARCH_KEY: window.env.ALGOLIASEARCH_SEARCH_KEY
      }
    : {
        AWS_APP_CLIENT_ID: process.env.AWS_APP_CLIENT_ID,
        AWS_REGION_IRELAND: process.env.AWS_REGION_IRELAND,
        AWS_SHORT_DOMAIN: process.env.AWS_SHORT_DOMAIN,
        AWS_USERPOOL_ID: process.env.AWS_USERPOOL_ID,
        STRIPE_API: process.env.STRIPE_API,
        STRIPE_API_KEY: process.env.STRIPE_API_KEY,
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
    // Cannot set cookieStorage for now - https://github.com/aws-amplify/amplify-js/issues/841
    // cookieStorage: {
    //   domain: runtimeConfig.AWS_SHORT_DOMAIN, // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //   expires: 365, // OPTIONAL - Cookie expiration in days
    //   path: "/", // OPTIONAL - Cookie path
    //   secure: true // OPTIONAL - Cookie secure flag
    // },
    mandatorySignIn: true,
    region: runtimeConfig.AWS_REGION_IRELAND,
    userPoolId: runtimeConfig.AWS_USERPOOL_ID,
    userPoolWebClientId: runtimeConfig.AWS_APP_CLIENT_ID
  },
  aws_appsync_graphqlEndpoint: runtimeConfig.GRAPHQL_API_URL,
  aws_appsync_region: runtimeConfig.AWS_REGION_IRELAND,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS"
};

export { runtimeConfig, awsExports };

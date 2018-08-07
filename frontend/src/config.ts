const runtimeConfig =
  typeof window !== "undefined"
    ? {
        AWS_APP_CLIENT_ID: window.env.AWS_APP_CLIENT_ID,
        AWS_REGION_IRELAND: window.env.AWS_REGION_IRELAND,
        AWS_SHORT_DOMAIN: window.env.AWS_SHORT_DOMAIN,
        AWS_USERPOOL_ID: window.env.AWS_USERPOOL_ID,
        STRIPE_API: window.env.STRIPE_API,
        STRIPE_API_KEY: window.env.STRIPE_API_KEY
      }
    : {
        AWS_APP_CLIENT_ID: process.env.AWS_APP_CLIENT_ID,
        AWS_REGION_IRELAND: process.env.AWS_REGION_IRELAND,
        AWS_SHORT_DOMAIN: process.env.AWS_SHORT_DOMAIN,
        AWS_USERPOOL_ID: process.env.AWS_USERPOOL_ID,
        STRIPE_API: process.env.STRIPE_API,
        STRIPE_API_KEY: process.env.STRIPE_API_KEY
      };

const awsExports = {
  Auth: {
    // Cannot set cookieStorage for now - https://github.com/aws-amplify/amplify-js/issues/841
    // // OPTIONAL - Configuration for cookie storage
    // cookieStorage: {
    //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //   domain: runtimeConfig.AWS_SHORT_DOMAIN,
    //   // OPTIONAL - Cookie expiration in days
    //   expires: 365,
    //   // OPTIONAL - Cookie path
    //   path: "/",
    //   // OPTIONAL - Cookie secure flag
    //   secure: true
    // },
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,
    // REQUIRED - Amazon Cognito Region
    region: runtimeConfig.AWS_REGION_IRELAND,
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: runtimeConfig.AWS_USERPOOL_ID,
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: runtimeConfig.AWS_APP_CLIENT_ID
  }
};

export { runtimeConfig, awsExports };

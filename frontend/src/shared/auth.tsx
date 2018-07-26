import Amplify from "aws-amplify";

export default Amplify.configure({
  Auth: {
    // OPTIONAL - Configuration for cookie storage
    cookieStorage: {
      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
      domain: process.env.AWS_SHORT_DOMAIN,
      // OPTIONAL - Cookie expiration in days
      expires: 365,
      // OPTIONAL - Cookie path
      path: "/",
      // OPTIONAL - Cookie secure flag
      secure: true
    },
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: process.env.AWS_IDENTITY_POOL_ID,
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
    // REQUIRED - Amazon Cognito Region
    region: process.env.AWS_REGION_PARIS,
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.AWS_USERPOOL_ID,
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.AWS_USERPOOL_API
  }
});

export default [];

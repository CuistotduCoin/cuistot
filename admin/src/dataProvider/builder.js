import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import Amplify, { Auth } from 'aws-amplify';
import { createAppSyncLink } from 'aws-appsync';

import buildGraphQLProvider from '.';

const AUTHENTICATION_TYPE = 'AMAZON_COGNITO_USER_POOLS';

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_AWS_REGION_IRELAND,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
  },
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_GRAPHQL_API_URL,
  aws_appsync_region: process.env.REACT_APP_AWS_REGION_IRELAND,
  aws_appsync_authenticationType: AUTHENTICATION_TYPE,
});

export default () => {
  const getGqlResource = (resource) => {
    switch (resource) {
      case 'workshops':
        return 'Workshop';
      default:
        throw new Error(`Unknown resource ${resource}`);
    }
  };

  const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => console.log(`[GraphQL error] : Message: ${message}, Location: ${locations}, Path: ${path}`));
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const appSyncLink = createAppSyncLink({
    url: process.env.REACT_APP_GRAPHQL_API_URL,
    region: process.env.REACT_APP_AWS_REGION_IRELAND,
    auth: {
      type: AUTHENTICATION_TYPE,
      jwtToken: async () => (
        Auth.currentSession()
          .then(currentSession => currentSession.getIdToken().getJwtToken())
          .catch(() => {
            Auth.signIn(process.env.REACT_APP_GUEST_USERNAME, process.env.REACT_APP_GUEST_PASSWORD)
              .then(() => {
                location.reload(); // eslint-disable-line
              })
              .catch((err) => {
                console.log(err);
              });
          })
      ),
    },
  });

  const link = ApolloLink.from([onErrorLink, appSyncLink]);

  return buildGraphQLProvider({
    clientOptions: {
      link,
      cache: new InMemoryCache(),
    },
  }).then(dataProvider => (type, resource, params) => (
    dataProvider(type, getGqlResource(resource), params)
  ));
};

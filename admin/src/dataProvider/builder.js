import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createAppSyncLink } from 'aws-appsync';

import { Auth } from '../auth';
import buildGraphQLProvider from '.';

export default () => {
  const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => console.error(`[GraphQL error] : Message: ${message}, Location: ${locations}, Path: ${path}`));
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  const appSyncLink = createAppSyncLink({
    url: process.env.REACT_APP_GRAPHQL_API_URL,
    region: process.env.REACT_APP_AWS_REGION_IRELAND,
    auth: {
      type: process.env.REACT_APP_AWS_AUTHENTICATION_TYPE,
      jwtToken: async () => (
        Auth.currentSession()
          .then(currentSession => currentSession.getIdToken().getJwtToken())
          .catch(() => {
            Auth.signIn(process.env.REACT_APP_GUEST_USERNAME, process.env.REACT_APP_GUEST_PASSWORD)
              .then(() => {
                location.reload(); // eslint-disable-line
              })
              .catch((err) => {
                console.error(err);
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
  });
};

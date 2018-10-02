import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

function createApolloClient({ ssrMode }) {
  return new ApolloClient({
    cache: ssrMode
      ? new InMemoryCache()
      : new InMemoryCache().restore(window.__APOLLO_STATE__),
    link: createHttpLink({
      credentials: 'same-origin',
      fetch,
      uri: 'http://localhost:64895',
    }),
    ssrMode});
}

export default createApolloClient;
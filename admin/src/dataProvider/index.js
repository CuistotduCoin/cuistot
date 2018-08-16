import buildDataProvider from 'ra-data-graphql';
import {
  DELETE,
  DELETE_MANY,
  UPDATE,
  UPDATE_MANY,
} from 'react-admin';

import buildQuery from './buildQuery';

const defaultOptions = {
  buildQuery,
};

export default options => (
  buildDataProvider(Object.assign({}, defaultOptions, options)).then(
    defaultDataProvider => (
      (fetchType, resource, params) => {
        // This provider does not support multiple deletions so instead we send multiple DELETE requests
        // This can be optimized using the apollo-link-batch-http link
        if (fetchType === DELETE_MANY) {
          const { ids, ...otherParams } = params;
          return Promise.all(params.ids.map(id => (
            defaultDataProvider(DELETE, resource, {
              id,
              ...otherParams,
            })
          ))).then((results) => {
            const result = results.reduce(
              (acc, { data }) => [...acc, data.id],
              [],
            );
            return { data: result };
          });
        }

        // This provider does not support multiple deletions so instead we send multiple UPDATE requests
        // This can be optimized using the apollo-link-batch-http link
        if (fetchType === UPDATE_MANY) {
          const { ids, ...otherParams } = params;
          return Promise.all(params.ids.map(id => (
            defaultDataProvider(UPDATE, resource, {
              id,
              ...otherParams,
            })
          ))).then((results) => {
            const result = results.reduce(
              (acc, { data }) => [...acc, data.id],
              [],
            );
            return { data: result };
          });
        }

        return defaultDataProvider(fetchType, resource, params);
      }
    ),
  )
);

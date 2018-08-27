import buildDataProvider from 'ra-data-graphql';
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  DELETE,
  DELETE_MANY,
  UPDATE,
  UPDATE_MANY,
} from 'react-admin';
import pluralize from 'pluralize';

import buildQuery from './buildQuery';

const defaultOptions = {
  buildQuery,
  introspection: {
    operationNames: {
      [GET_LIST]: resource => `get${pluralize(resource.name)}Page`,
      [GET_ONE]: resource => `get${resource.name}`,
      [GET_MANY]: resource => `get${pluralize(resource.name)}Page`,
      [GET_MANY_REFERENCE]: resource => `get${pluralize(resource.name)}Page`,
      [CREATE]: resource => `create${resource.name}`,
      [UPDATE]: resource => `update${resource.name}`,
      [DELETE]: resource => `delete${resource.name}`,
    },
    exclude: undefined,
    include: undefined,
  },
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

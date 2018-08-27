import gql from 'graphql-tag';
import buildVariables from './buildVariables';
import buildGqlQuery from './buildGqlQuery';
import getResponseParser from './getResponseParser';

const getGqlResourceName = (resourceName) => {
  switch (resourceName) {
    case 'workshops':
      return 'Workshop';
    case 'gourmets':
      return 'Gourmet';
    case 'kitchens':
      return 'Kitchen';
    case 'cooks':
      return 'Cook';
    case 'bookings':
      return 'Booking';
    case 'evaluations':
      return 'Evaluation';
    default:
      throw new Error(`Unknown resource ${resourceName}`);
  }
};

export const buildQueryFactory = (
  buildVariablesImpl,
  buildGqlQueryImpl,
  getResponseParserImpl,
) => (introspectionResults) => {
  const knownResources = introspectionResults.resources.map(r => r.type.name);

  return (aorFetchType, resourceName, params) => {
    console.log('introspectionResults : ', introspectionResults);
    console.log('knownResources : ', knownResources);
    console.log('aorFetchType : ', aorFetchType);
    console.log('resourceName : ', resourceName);
    console.log('params : ', params);

    const gqlResourceName = getGqlResourceName(resourceName);
    const resource = introspectionResults.resources.find(r => r.type.name === gqlResourceName);

    if (!resource) {
      throw new Error(`Unknown resource ${gqlResourceName}. Make sure it has been declared on your server side schema. Known resources are ${knownResources.join(', ')}`);
    }

    const queryType = resource[aorFetchType];

    if (!queryType) {
      throw new Error(`No query or mutation matching aor fetch type ${aorFetchType} could be found for resource ${resource.type.name}`);
    }

    console.log('queryType : ', queryType);

    const variables = buildVariablesImpl(introspectionResults)(
      resource,
      aorFetchType,
      params,
      queryType,
    );

    console.log('variables : ', variables);

    const query = buildGqlQueryImpl(introspectionResults)(
      resource,
      aorFetchType,
      queryType,
      variables,
      resourceName,
    );

    console.log('query : ', query);

    const parseResponse = getResponseParserImpl(introspectionResults)(
      aorFetchType,
      resource,
      queryType,
      resourceName,
    );

    return {
      query: gql`
        ${query}
      `,
      variables,
      parseResponse,
    };
  };
};

export default buildQueryFactory(
  buildVariables,
  buildGqlQuery,
  getResponseParser,
);

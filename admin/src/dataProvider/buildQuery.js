import gql from 'graphql-tag';
import buildVariables from './buildVariables';
import buildGqlQuery from './buildGqlQuery';
import getResponseParser from './getResponseParser';

export const buildQueryFactory = (
  buildVariablesImpl,
  buildGqlQueryImpl,
  getResponseParserImpl,
) => (introspectionResults) => {
  console.log('introspectionResults : ', introspectionResults);
  const knownResources = introspectionResults.resources.map(r => r.type.name);
  console.log('knownResources : ', knownResources);

  return (aorFetchType, resourceName, params) => {
    console.log('aorFetchType : ', aorFetchType);
    console.log('resourceName : ', resourceName);
    console.log('params : ', params);
    const resource = introspectionResults.resources.find(r => r.type.name === resourceName);

    if (!resource) {
      throw new Error(`Unknown resource ${resourceName}. Make sure it has been declared on your server side schema. Known resources are ${knownResources.join(', ')}`);
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
    );

    console.log('query : ', query);

    const parseResponse = getResponseParserImpl(introspectionResults)(
      aorFetchType,
      resource,
      queryType,
    );

    console.log('parseReponse : ', parseResponse);

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

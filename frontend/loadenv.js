const fs = require('fs');
const awsParamEnv = require('aws-param-env'); // eslint-disable-line
const region = 'eu-west-1';
const stage = process.env.NODE_ENV;

if (!stage) {
  throw new Error('Stage is missing !');
}

awsParamEnv.load(`/cuistot/${stage}`, { region });
awsParamEnv.load('/cuistot/front', { region });
awsParamEnv.load(`/cuistot/front/${stage}`, { region });

const content = `\
AWS_DOMAIN=${process.env.domain}
AWS_REGION_IRELAND=eu-west-1
AWS_DEPLOYMENT_BUCKET=${process.env['deployment-bucket']}
AWS_USERPOOL_ID=${process.env['userpool-id']}
AWS_IDENTITY_POOL_ID=${process.env['identity-pool-id']}
AWS_STORE_BUCKET=${process.env['store-bucket']}
AWS_APP_CLIENT_ID=${process.env['app-client-id']}
GRAPHQL_API_URL=${process.env['graphql-api-url']}
GUEST_USERNAME=${process.env['guest-username']}
GUEST_PASSWORD=${process.env['guest-password']}
ALGOLIASEARCH_SEARCH_APP_ID=${process.env['algolia-search-app-id']}
ALGOLIASEARCH_SEARCH_KEY=${process.env['algolia-search-key']}
ALGOLIASEARCH_PLACES_APP_ID=${process.env['algolia-places-app-id']}
ALGOLIASEARCH_PLACES_KEY=${process.env['algolia-places-key']}
SENTRY_DSN=${process.env['sentry-dsn']}
`;

fs.writeFile('.env', content, (err) => {
  if (err) throw err;
  console.log('.env saved...');
});

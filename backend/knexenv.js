const fs = require('fs');
const awsParamEnv = require('aws-param-env'); // eslint-disable-line
const region = 'eu-west-1';
const stage = process.env.NODE_ENV;

if (!stage) {
  throw new Error('Stage is missing !');
}

awsParamEnv.load(`/cuistot/${stage}/database`, { region });

const content = `\
NODE_ENV=${process.env.NODE_ENV}
DATABASE_HOST=${process.env.host}
DATABASE_PORT=${process.env.port}
DATABASE_NAME=${process.env.name}
DATABASE_USERNAME=${process.env.username}
DATABASE_PASSWORD=${process.env.password}
`;

fs.writeFile('.env', content, (err) => {
  if (err) throw err;
  console.log('.env saved...');
});

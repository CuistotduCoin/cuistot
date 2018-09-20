const fs = require('fs');
const awsParamEnv = require('aws-param-env'); // eslint-disable-line

awsParamEnv.load('/cuistot/database', { region: 'eu-west-1' });

const content = `\
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

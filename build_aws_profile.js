const fs = require('fs');

const content = `\
[profile default]
region = eu-west-1

[profile ${process.env.STAGE}]
role_arn = arn:aws:iam::${process.env.AWS_CROSS_ACCOUNT_ID}:role/DeveloperAccess
source_profile = default
region = eu-west-1
`;

fs.writeFile(process.env.AWS_CONFIG_FILE, content, (err) => {
  if (err) throw err;
  console.log('aws config saved...');
});

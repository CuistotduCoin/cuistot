import AWS from 'aws-sdk';
import { get } from '../utils/utils';
import { createGourmet } from '../resolvers/gourmet-resolver';

export const handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line

  // Add the new gourmet to the gourmet group once the user has been confirmed
  if (!event.request.userAttributes['cognito:user_status'] === 'CONFIRMED' || !event.request.userAttributes.email_verified === 'true') {
    const error = new Error('User was not properly confirmed and/or email not verified');
    callback(error, event);
  }
  const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
  const params = {
    GroupName: 'Gourmet',
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };
  cognitoIdentityServiceProvider.adminAddUserToGroup(params, (err) => {
    if (err) {
      callback(err, event);
    } else {
      // Create a Gourmet object in RDS
      const args = {
        id: event.request.userAttributes.sub,
        username: event.userName,
        email: event.request.userAttributes.email,
        first_name: event.request.userAttributes.name,
        last_name: event.request.userAttributes.family_name,
      };

      if (get(event, 'request.userAttributes.phone_number')) {
        args.phone_number = event.request.userAttributes.phone_number;
      }

      createGourmet(args).then((result) => {
        if (result.userError) {
          callback(result, event);
        } else {
          const publishParams = {
            Message: JSON.stringify({
              from: 'stephane@cuistotducoin.com', // replace by real email
              to: 'stephane@cuistotducoin.com', // replace by real email
              subject: 'Cuistot du coin te souhaite la bienvenue',
              template: 'welcome',
              context: { name: args.first_name },
            }),
            TopicArn: 'arn:aws:sns:eu-west-1:942691749050:mailer',
          };
          const publishPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(publishParams).promise();
          publishPromise
            .then((data) => {
              console.log(`Message send sent to the topic ${publishParams.TopicArn}`);
              console.log(`MessageID is ${data.MessageId}`);
              callback(null, event);
            })
            .catch((error) => {
              callback(error, event);
            });
        }
      }).catch((error) => {
        callback(error, event);
      });
    }
  });
};

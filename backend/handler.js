import AWS from 'aws-sdk';
import {
  getBooking,
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} from './resolvers/booking-resolver';
import {
  getCook,
  getCooks,
  createCook,
  updateCook,
  deleteCook,
  getCookWorkshops,
  getCookEvaluations,
} from './resolvers/cook-resolver';
import {
  getEvaluation,
  getEvaluations,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation,
} from './resolvers/evaluation-resolver';
import {
  getGourmet,
  getGourmets,
  createGourmet,
  updateGourmet,
  deleteGourmet,
  getGourmetBookings,
} from './resolvers/gourmet-resolver';
import {
  getKitchen,
  getKitchens,
  createKitchen,
  updateKitchen,
  deleteKitchen,
} from './resolvers/kitchen-resolver';
import {
  getWorkshop,
  getWorkshops,
  getWorkshopBookings,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
} from './resolvers/workshop-resolver';
import { run } from './mailer';
import { isEmpty } from './utils/utils';

export const graphqlHandler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line

  const resolve = (resolver, key) => {
    resolver(event.arguments).then((result) => {
      const requestResult = { errors: [] };
      if (result.userError) {
        requestResult.errors.push({ message: result.userError });
      } else if (key) {
        requestResult[key] = result.data;
      }
      if (result.message) {
        requestResult.message = result.message;
      }
      callback(null, requestResult);
    }).catch((error) => {
      callback(error, null);
    });
  };

  switch (event.field) {
    case 'getBooking': {
      resolve(getBooking, 'booking');
      break;
    }
    case 'getBookings': {
      resolve(getBookings, 'bookings');
      break;
    }
    case 'getCook': {
      resolve(getCook, 'cook');
      break;
    }
    case 'getCooks': {
      resolve(getCooks, 'cooks');
      break;
    }
    case 'getCookWorkshops': {
      resolve(getCookWorkshops, 'workshops');
      break;
    }
    case 'getCookEvaluations': {
      resolve(getCookEvaluations, 'evaluations');
      break;
    }
    case 'getEvaluation': {
      resolve(getEvaluation, 'evaluation');
      break;
    }
    case 'getEvaluations': {
      resolve(getEvaluations, 'evaluations');
      break;
    }
    case 'getGourmet': {
      resolve(getGourmet, 'gourmet');
      break;
    }
    case 'getGourmets': {
      resolve(getGourmets, 'gourmets');
      break;
    }
    case 'getGourmetBookings': {
      resolve(getGourmetBookings, 'bookings');
      break;
    }
    case 'getKitchen': {
      resolve(getKitchen, 'kitchen');
      break;
    }
    case 'getKitchens': {
      resolve(getKitchens, 'kitchens');
      break;
    }
    case 'getWorkshop': {
      resolve(getWorkshop, 'workshop');
      break;
    }
    case 'getWorkshops': {
      resolve(getWorkshops, 'workshops');
      break;
    }
    case 'getWorkshopBookings': {
      resolve(getWorkshopBookings, 'bookings');
      break;
    }
    case 'createWorkshop': {
      resolve(createWorkshop, 'workshop');
      break;
    }
    case 'updateWorkshop': {
      resolve(updateWorkshop, 'workshop');
      break;
    }
    case 'deleteWorkshop': {
      resolve(deleteWorkshop);
      break;
    }
    case 'createBooking': {
      resolve(createBooking, 'booking');
      break;
    }
    case 'updateBooking': {
      resolve(updateBooking, 'booking');
      break;
    }
    case 'deleteBooking': {
      resolve(deleteBooking);
      break;
    }
    case 'createEvaluation': {
      resolve(createEvaluation, 'evaluation');
      break;
    }
    case 'updateEvaluation': {
      resolve(updateEvaluation, 'evaluation');
      break;
    }
    case 'deleteEvaluation': {
      resolve(deleteEvaluation);
      break;
    }
    case 'createGourmet': {
      resolve(createGourmet, 'gourmet');
      break;
    }
    case 'updateGourmet': {
      resolve(updateGourmet, 'gourmet');
      break;
    }
    case 'deleteGourmet': {
      resolve(deleteGourmet);
      break;
    }
    case 'createCook': {
      resolve(createCook, 'cook');
      break;
    }
    case 'updateCook': {
      resolve(updateCook, 'cook');
      break;
    }
    case 'deleteCook': {
      resolve(deleteCook);
      break;
    }
    case 'createKitchen': {
      resolve(createKitchen, 'kitchen');
      break;
    }
    case 'updateKitchen': {
      resolve(updateKitchen, 'kitchen');
      break;
    }
    case 'deleteKitchen': {
      resolve(deleteKitchen);
      break;
    }
    default: {
      callback(`Unknown field, unable to resolve ${event.field}`, null);
      break;
    }
  }
};

export const postConfirmationHandler = (event, context, callback) => {
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
        email: event.request.userAttributes.email,
        first_name: event.request.userAttributes.name,
        last_name: event.request.userAttributes.family_name,
      };
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

export const sendEmail = (event, context) => {
  let payload;
  if (!isEmpty(event.Records)) { // lambda is called by SNS
    payload = JSON.parse(event.Records[0].Sns.Message);
  } else {
    payload = event;
  }
  run(payload, context, context.done);
};

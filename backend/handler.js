import AWS from 'aws-sdk';
import { getBooking, createBooking, updateBooking, deleteBooking } from './resolvers/booking-resolver';
import {
  getCook,
  createCook,
  updateCook,
  deleteCook,
  getCookWorkshops,
  getCookEvaluations,
} from './resolvers/cook-resolver';
import { getEvaluation, createEvaluation, updateEvaluation, deleteEvaluation } from './resolvers/evaluation-resolver';
import {
  getGourmet,
  createGourmet,
  updateGourmet,
  deleteGourmet,
  getGourmetBookings,
} from './resolvers/gourmet-resolver';
import { getKitchen, createKitchen, updateKitchen, deleteKitchen } from './resolvers/kitchen-resolver';
import {
  getWorkshop,
  getWorkshops,
  getWorkshopBookings,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
} from './resolvers/workshop-resolver';
import { run } from './mailer';

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
    case 'getCook': {
      resolve(getCook, 'cook');
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
    case 'getGourmet': {
      resolve(getGourmet, 'gourmet');
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
          callback(null, event);
        }
      }).catch((error) => {
        callback(error, event);
      });
    }
  });
};

export const sendEmail = (event, context) => {
  run(event, context, (error, result) => context.done(error, result));
};

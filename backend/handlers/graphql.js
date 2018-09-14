import AWS from 'aws-sdk';
import connection from '../knexfile';
import {
  getBooking,
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  recreateBooking,
} from '../resolvers/booking-resolver';
import {
  getCook,
  getCooks,
  createCook,
  updateCook,
  confirmCook,
  deleteCook,
  getCookWorkshops,
  getCookEvaluations,
  recreateCook,
} from '../resolvers/cook-resolver';
import {
  getEvaluation,
  getEvaluations,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation,
  recreateEvaluation,
} from '../resolvers/evaluation-resolver';
import {
  getGourmet,
  getGourmets,
  createGourmet,
  updateGourmet,
  deleteGourmet,
  getGourmetBookings,
  recreateGourmet,
} from '../resolvers/gourmet-resolver';
import {
  getKitchen,
  getKitchens,
  createKitchen,
  updateKitchen,
  deleteKitchen,
  recreateKitchen,
} from '../resolvers/kitchen-resolver';
import {
  getWorkshop,
  getWorkshops,
  getWorkshopBookings,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  recreateWorkshop,
} from '../resolvers/workshop-resolver';

const knex = require('knex')(connection[process.env.NODE_ENV]);

export const handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line

  const resolve = (resolver, key, resolvedCallback) => {
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

      if (!requestResult.errors.length) {
        if (resolvedCallback) {
          resolvedCallback(requestResult, event.arguments);
        } else {
          callback(null, requestResult);
        }
      } else {
        callback(requestResult.errors[0].message, null);
      }
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
    case 'recreateWorkshop': {
      resolve(recreateWorkshop);
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
    case 'recreateBooking': {
      resolve(recreateBooking);
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
    case 'recreateEvaluation': {
      resolve(recreateEvaluation);
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
    case 'recreateGourmet': {
      resolve(recreateGourmet);
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
    case 'confirmCook': {
      resolve(confirmCook, null, (requestResult, args) => {
        const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
        knex('gourmets').where('id', args.id).first()
          .then((gourmet) => {
            const params = {
              GroupName: 'Cook',
              UserPoolId: process.env.AWS_USERPOOL_ID,
              Username: gourmet.username,
            };
            cognitoIdentityServiceProvider.adminAddUserToGroup(params, (err) => {
              if (err) {
                callback(err, null);
              } else {
                callback(null, requestResult);
              }
            });
          })
          .catch((err) => {
            console.error(err);
            callback(err, null);
          });
      });
      break;
    }
    case 'deleteCook': {
      resolve(deleteCook, null, (requestResult, args) => {
        const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
        knex('gourmets').where('id', args.id).first()
          .then((gourmet) => {
            const params = {
              GroupName: 'Cook',
              UserPoolId: process.env.AWS_USERPOOL_ID,
              Username: gourmet.username,
            };
            cognitoIdentityServiceProvider.adminRemoveUserFromGroup(params, (err) => {
              if (err) {
                callback(err, null);
              } else {
                callback(null, requestResult);
              }
            });
          })
          .catch((err) => {
            console.error(err);
            callback(err, null);
          });
      });
      break;
    }
    case 'recreateCook': {
      resolve(recreateCook);
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
    case 'recreateKitchen': {
      resolve(recreateKitchen);
      break;
    }
    default: {
      callback(`Unknown field, unable to resolve ${event.field}`, null);
      break;
    }
  }
};

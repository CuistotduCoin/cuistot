import { getBooking, createBooking, updateBooking, deleteBooking } from './resolvers/booking-resolver';
import {
  getCook,
  createCook,
  updateCook,
  deleteCook,
  getCookWorkshops,
} from './resolvers/cook-resolver';
import { getEvaluation, createEvaluation, deleteEvaluation } from './resolvers/evaluation-resolver';
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

export const guestSignInHandler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line

  console.log('event : ', event);
  console.log('context : ', context);

  if (event.userName === 'guest') {
    callback(null, 'success');
  } else {
    // Return to Amazon Cognito
    callback(null, event);
  }
};

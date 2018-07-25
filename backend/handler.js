import { getBooking, createBooking } from './resolvers/booking-resolver';
import { getCook, createCook } from './resolvers/cook-resolver';
import { getEvaluation, createEvaluation } from './resolvers/evaluation-resolver';
import { getGourmet, createGourmet } from './resolvers/gourmet-resolver';
import { getKitchen, createKitchen } from './resolvers/kitchen-resolver';
import {
  getWorkshop,
  getWorkshops,
  getWorkshopBookings,
  createWorkshop,
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
    case 'getEvaluation': {
      resolve(getEvaluation, 'evaluation');
      break;
    }
    case 'getGourmet': {
      resolve(getGourmet, 'gourmet');
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
    case 'deleteWorkshop': {
      resolve(deleteWorkshop);
      break;
    }
    case 'createBooking': {
      resolve(createBooking, 'booking');
      break;
    }
    case 'createEvaluation': {
      resolve(createEvaluation, 'evaluation');
      break;
    }
    case 'createGourmet': {
      resolve(createGourmet, 'gourmet');
      break;
    }
    case 'createCook': {
      resolve(createCook, 'cook');
      break;
    }
    case 'createKitchen': {
      resolve(createKitchen, 'kitchen');
      break;
    }
    default: {
      callback(`Unknown field, unable to resolve ${event.field}`, null);
      break;
    }
  }
};

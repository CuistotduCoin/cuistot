import { getBooking } from './resolvers/booking-resolver';
import { getCook } from './resolvers/cook-resolver';
import { getEvaluation } from './resolvers/evaluation-resolver';
import { getGourmet } from './resolvers/gourmet-resolver';
import { getKitchen } from './resolvers/kitchen-resolver';
import { getWorkshop, getWorkshops } from './resolvers/workshop-resolver';

export const graphqlHandler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line

  const resolve = (resolver, key) => {
    resolver(event.arguments).then((result) => {
      const requestResult = { userErrors: [] };
      if (result.userError) {
        requestResult.userErrors.push({ message: result.userError });
      } else {
        requestResult[key] = result.data;
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
    default: {
      callback(`Unknown field, unable to resolve ${event.field}`, null);
      break;
    }
  }
};

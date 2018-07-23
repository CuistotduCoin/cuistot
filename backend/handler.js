import { getBooking } from './resolvers/booking-resolver';
import { getCook } from './resolvers/cook-resolver';
import { getEvaluation } from './resolvers/evaluation-resolver';
import { getGourmet } from './resolvers/gourmet-resolver';
import { getKitchen } from './resolvers/kitchen-resolver';
import { getWorkshop, getWorkshops } from './resolvers/workshop-resolver';

export const graphqlHandler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line

  const resolve = (resolver) => {
    resolver(event.arguments).then((result) => {
      callback(null, result);
    }).catch((error) => {
      callback(error, null);
    });
  };

  switch (event.field) {
    case 'getBooking': {
      resolve(getBooking);
      break;
    }
    case 'getCook': {
      resolve(getCook);
      break;
    }
    case 'getEvaluation': {
      resolve(getEvaluation);
      break;
    }
    case 'getGourmet': {
      resolve(getGourmet);
      break;
    }
    case 'getKitchen': {
      resolve(getKitchen);
      break;
    }
    case 'getWorkshop': {
      resolve(getWorkshop);
      break;
    }
    case 'getWorkshops': {
      resolve(getWorkshops);
      break;
    }
    default: {
      callback(`Unknown field, unable to resolve ${event.field}`, null);
      break;
    }
  }
};

import { getBooking } from './resolvers/booking-resolver';
import { getCook } from './resolvers/cook-resolver';
import { getEvaluation } from './resolvers/evaluation-resolver';
import { getGourmet } from './resolvers/gourmet-resolver';
import { getKitchen } from './resolvers/kitchen-resolver';
import { getWorkshop } from './resolvers/workshop-resolver';

export const graphqlHandler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line

  const getElement = (resolver) => {
    resolver(event.arguments).then((result) => {
      callback(null, result);
    }).catch((error) => {
      callback(error, null);
    });
  };

  switch (event.field) {
    case 'getBooking': {
      getElement(getBooking);
      break;
    }
    case 'getCook': {
      getElement(getCook);
      break;
    }
    case 'getEvaluation': {
      getElement(getEvaluation);
      break;
    }
    case 'getGourmet': {
      getElement(getGourmet);
      break;
    }
    case 'getKitchen': {
      getElement(getKitchen);
      break;
    }
    case 'getWorkshop': {
      getElement(getWorkshop);
      break;
    }
    case 'getWorkshops': {
      break;
    }
    default: {
      callback(`Unknown field, unable to resolve ${event.field}`, null);
      break;
    }
  }
};

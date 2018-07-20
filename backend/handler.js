const { getWorkshop } = require('./resolvers/workshop-resolver');

exports.graphqlHandler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  switch (event.field) {
    case 'getWorkshop': {
      getWorkshop(event.arguments).then(result => {
        callback(null, result);
      }).catch(error => {
        callback(error, null);
      });
      break;
    }
    default: {
      callback(`Unknown field, unable to resolve ${event.field}`, null);
      break;
    }
  }
};

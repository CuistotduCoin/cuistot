import 'babel-polyfill';

exports.graphqlHandler = (event, context, callback) => {
  console.log('Received event {}', JSON.stringify(event, 3));

  const consumerKey = event.arguments.consumer_key;
  const consumerSecret = event.arguments.consumer_secret;

  console.log('Got an Invoke Request.');
  switch (event.field) {
    case 'getUserInfo': {
      getRawTweets(event.arguments.handle, consumerKey, consumerSecret).then(
        result => {
          callback(null, result);
        }
      );

      break;
    }
    case 'meInfo': {
      getRawTweets(event.handle, consumerKey, consumerSecret).then(result => {
        callback(null, result);
      });

      break;
    }
    default: {
      callback(`Unknown field, unable to resolve ${event.field}`, null);
      break;
    }
  }
};

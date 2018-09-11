import AWS from 'aws-sdk';
import connection from './knexfile';
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
  confirmCook,
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
import { isEmpty, get } from './utils/utils';
import { findWhere, findFirstWhere, updateObject } from './resolvers/utils';
import { processImage, optimizedVersionFilename, OPTIMIZED_VERSION_EXTENSION } from './processors/image';

const knex = require('knex')(connection[process.env.NODE_ENV]);

export const graphqlHandler = (event, context, callback) => {
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
        username: event.userName,
        email: event.request.userAttributes.email,
        first_name: event.request.userAttributes.name,
        last_name: event.request.userAttributes.family_name,
      };

      if (get(event, 'request.userAttributes.phone_number')) {
        args.phone_number = event.request.userAttributes.phone_number;
      }

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

/*
  Handle put event in the store bucket
    Return if the image is a already an optimized version
    For profiles :
      Delete all other profile images for the user (original and cropped versions)
    Optimize, crop and put the optimized version in the bucket
*/
export const handleBucketPutEvent = (event, context) => {
  const s3 = new AWS.S3();
  const payload = event.Records[0];
  const url = payload.s3.object.key.split('/');
  const identityId = decodeURIComponent(url[1]);
  const type = decodeURIComponent(url[2]);

  const optimizeImage = (path, filename, resolver, options) => {
    const newFilename = optimizedVersionFilename(filename);
    processImage(`${path}/${filename}`, `${path}/${newFilename}`, resolver(newFilename), context.fail, options);
  };

  if (type === 'profile' || type === 'cook') {
    const filename = decodeURIComponent(url[3]);
    const path = `protected/${identityId}/${type}`;
    const key = `${path}/${filename}`;
    let tableName;
    const options = {};

    if (type === 'profile') {
      tableName = 'gourmets';
      options.width = 120;
      options.height = 120;
    } else if (type === 'cook') {
      tableName = 'cooks';
    }

    const resolver = newFilename => () => {
      findWhere('gourmets', identityId, 'identity_id')
        .then((result) => {
          const gourmet = result.data[0];
          updateObject(tableName, {
            id: gourmet.id,
            image: { key: newFilename },
          })
            .then(() => context.done(null, event))
            .catch(updateErr => context.fail(updateErr));
        })
        .catch(findErr => context.fail(findErr));
    };

    s3.headObject({ Bucket: process.env.AWS_BUCKET, Key: key }, (err, data) => {
      if (data.Metadata && data.Metadata.optimized) {
        console.log('Image already processed');
        context.done(null, event);
      } else {
        s3.listObjects({ Bucket: process.env.AWS_BUCKET, Prefix: path }, (listErr, listData) => {
          if (listErr) {
            context.fail(listErr);
          } else {
            const objectsToDelete = listData.Contents
              .filter(file => file.Key !== key)
              .map(file => ({ Key: file.Key }));

            if (objectsToDelete.length) {
              s3.deleteObjects({
                Bucket: process.env.AWS_BUCKET,
                Delete: {
                  Objects: objectsToDelete,
                  Quiet: false,
                },
              }, (deleteErr) => {
                if (deleteErr) {
                  context.fail(deleteErr);
                } else {
                  optimizeImage(path, filename, resolver, options);
                }
              });
            } else {
              optimizeImage(path, filename, resolver, options);
            }
          }
        });
      }
    });
  } else if (type === 'workshops') {
    const workshopId = decodeURIComponent(url[3]);
    const filename = decodeURIComponent(url[4]);
    const path = `protected/${identityId}/workshops/${workshopId}`;

    s3.headObject({ Bucket: process.env.AWS_BUCKET, Key: `${path}/${filename}` }, (err, data) => {
      if (data.Metadata && data.Metadata.optimized) {
        console.log('Image already processed');
        context.done(null, event);
      } else {
        const resolver = newFilename => () => {
          findFirstWhere('workshops', workshopId)
            .then((result) => {
              const images = result.data.images;
              images.push({ key: newFilename });
              updateObject('workshops', {
                id: workshopId,
                images: JSON.stringify(images),
              })
                .then(() => context.done(null, event))
                .catch(updateErr => context.fail(updateErr));
            })
            .catch(findErr => context.fail(findErr));
        };
        optimizeImage(path, filename, resolver, {});
      }
    });
  } else {
    context.done(null, event);
  }
};

export const handleBucketDeleteEvent = (event, context) => {
  const s3 = new AWS.S3();
  const payload = event.Records[0];
  const url = payload.s3.object.key.split('/');
  const type = decodeURIComponent(url[2]);
  const filename = decodeURIComponent(url[4]);

  if (type === 'workshops' && filename.includes(`_${OPTIMIZED_VERSION_EXTENSION}`)) {
    const identityId = decodeURIComponent(url[1]);
    const workshopId = decodeURIComponent(url[3]);
    const path = `protected/${identityId}/workshops/${workshopId}`;
    const originalKey = `${path}/${filename.replace(`_${OPTIMIZED_VERSION_EXTENSION}`, '')}`;

    // Deletes the original file from the bucket
    s3.deleteObjects({
      Bucket: process.env.AWS_BUCKET,
      Delete: {
        Objects: [{ Key: originalKey }],
        Quiet: false,
      },
    }, (deleteErr) => {
      if (deleteErr) {
        context.fail(deleteErr);
      } else {
        // Remove the key from workshop images in our database
        findFirstWhere('workshops', workshopId)
          .then((result) => {
            const images = result.data.images.filter(image => image.key !== filename);
            updateObject('workshops', { id: workshopId, images: JSON.stringify(images) })
              .then(() => context.done(null, event))
              .catch(updateErr => context.fail(updateErr));
          })
          .catch(findErr => context.fail(findErr));
      }
    });
  } else {
    context.done(null, event);
  }
};

import AWS from 'aws-sdk';
import { findWhere, findFirstWhere, updateObject } from '../resolvers/utils';
import { processImage, optimizedVersionFilename } from '../processors/image';

/*
  Handle put event in the store bucket
    Return if the image is a already an optimized version
    For profiles :
      Delete all other profile images for the user (original and cropped versions)
    Optimize, crop and put the optimized version in the bucket
*/
export const handler = (event, context) => {
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

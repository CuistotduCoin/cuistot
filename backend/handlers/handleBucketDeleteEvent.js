import AWS from 'aws-sdk';
import { findFirstWhere, updateObject } from '../resolvers/utils';
import { OPTIMIZED_VERSION_EXTENSION } from '../processors/image';

export const handler = (event, context) => {
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

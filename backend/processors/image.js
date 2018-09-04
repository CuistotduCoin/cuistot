import async from 'async';
import AWS from 'aws-sdk';

const gm = require('gm').subClass({ imageMagick: true });

const SKIP_FILE_SIZE = +process.env.MAX_FILE_SIZE || -1;
const OPTIMIZED_VERSION_EXTENSION = 'cropped';

const optimizedVersionFilename = (filename) => {
  const chunks = filename.split('.');
  const ext = chunks.pop();
  return `${chunks.join('.')}_${OPTIMIZED_VERSION_EXTENSION}.${ext}`;
};

const isImageFile = (key) => {
  const extMatch = key.match(/\.([^.]*)$/);
  if (!extMatch) {
    console.error(`Unable to infer image type for key ${key}`);
    return false;
  }
  const ext = extMatch[1].toLowerCase();
  if (!['jpg', 'jpeg', 'png'].includes(ext)) {
    return false;
  }
  return true;
};

const gmToBuffer = data => (
  new Promise((resolve, reject) => {
    data.stream((err, stdout, stderr) => { // eslint-disable-line
      if (err) return reject(err);
      const chunks = [];
      stdout.on('data', chunk => chunks.push(chunk));
      // these are 'once' because they can and do fire multiple times for multiple errors,
      // but this is a promise so you'll have to deal with them one at a time
      stdout.once('end', () => resolve(Buffer.concat(chunks)));
      stderr.once('data', result => reject(String(result)));
    });
  })
);

const processImage = (key, newKey, resolve, reject) => {
  console.log('Processing');
  const s3 = new AWS.S3();

  async.waterfall([
    function check(next) {
      console.log('Check');
      s3.headObject({ Bucket: process.env.AWS_BUCKET, Key: key }, (err, data) => {
        if (err) return next(err);

        if (data.Metadata && data.Metadata.optimized) {
          console.log('Image is already optimized. Skipping.');
          return next('skip');
        }

        if (!isImageFile(key)) {
          console.log('File is not an image type. Skipping.');
          return next('skip');
        }

        if (!data.ContentLength) {
          console.log('Image is empty. Skipping.');
          return next('skip');
        }

        console.log(`File size is ${data.ContentLength} bytes`);
        if (SKIP_FILE_SIZE !== -1 && data.ContentLength > SKIP_FILE_SIZE) {
          console.log('Image is larger than configured threshold. Skipping.');
          return next('skip');
        }

        return next(null, data);
      });
    },
    function download(meta, next) {
      console.log('Download');
      s3.getObject({ Bucket: process.env.AWS_BUCKET, Key: key }, (err, data) => {
        if (err) return next(err);
        return next(null, meta, data);
      });
    },
    function process(meta, obj, next) {
      console.log('Process');
      const data = gm(obj.Body).quality(80).resize(120, 120);
      gmToBuffer(data)
        .then(buffer => next(null, meta, obj, buffer))
        .catch(err => next(err));
    },
    function upload(meta, obj, file, next) {
      console.log('Upload');
      meta.Metadata.optimized = 'y'; // eslint-disable-line
      s3.putObject({
        Bucket: process.env.AWS_BUCKET,
        Key: newKey,
        Body: file,
        ContentType: obj.ContentType,
        Metadata: meta.Metadata,
      }, (err) => {
        if (err) return next(err);
        console.log('File uploaded : ', newKey);
        return next();
      });
    },
  ], (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
};

export { processImage, optimizedVersionFilename, OPTIMIZED_VERSION_EXTENSION };

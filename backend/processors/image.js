// https://github.com/sourcey/s3-image-optimizer/blob/master/optimizer.js
import async from 'async';
import AWS from 'aws-sdk';

// const imagemin = require('imagemin');
// const imageminPngquant = require('imagemin-pngquant');
// const imageminMozjpeg = require('imagemin-mozjpeg');

// const Imagemin = require('image-min');

const SKIP_FILE_SIZE = +process.env.MAX_FILE_SIZE || -1;

// Imagemin options object for all image types
// const imageminOptions = {
//   optimizationLevel: (+process.env.PNG_OPTIM_LEVEL || 7),
//   progressive: (process.env.JPG_OPTIM_PROGRESSIVE === 'true'),
//   interlaced: (process.env.GIF_OPTIM_INTERLACED === 'true'),
// };

const suffixFilename = (filename, suffix) => {
  const chunks = filename.split('.');
  const ext = chunks.pop();
  return `${chunks.join('.')}_${suffix}.${ext}`;
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

const processImage = (key, newKey, successCallback, failureCallback) => {
  console.log('Processing : ', key);
  const s3 = new AWS.S3();

  async.waterfall([
    function check(next) {
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
      console.log('Download image');
      s3.getObject({ Bucket: process.env.AWS_BUCKET, Key: key }, (err, data) => {
        if (err) return next(err);
        return next(null, meta, data);
      });
    },

    function process(meta, obj, next) {
      console.log('Process image');
      return next(null, meta, obj, obj.Body);
      // imagemin.buffer(obj.Body, {
      //   plugins: [
      //     imageminPngquant(),
      //     imageminMozjpeg({ quality: 82 }),
      //   ],
      // }).then((buffer) => {
      //   console.log(`Optimized! Final file size reduced from ${obj.Body.length} to ${buffer.length} bytes`);
      //   return next(null, meta, obj, buffer);
      // });
      // new Imagemin()
      //   .src(obj.Body)
      //   .use(Imagemin.jpegtran(imageminOptions))
      //   .use(Imagemin.gifsicle(imageminOptions))
      //   .use(Imagemin.optipng(imageminOptions))
      //   .use(Imagemin.svgo({ plugins: imageminOptions.svgoPlugins || [] }))
      //   .run((err, files) => {
      //     console.log(files);
      //     if (err) return next(err);
      //     return next(null, meta, obj, files[0]);
      //   });
    },

    function upload(meta, obj, file, next) {
      console.log('Upload image');
      meta.Metadata.optimized = 'y'; // eslint-disable-line

      s3.putObject({
        // ACL: UPLOAD_ACL,
        Bucket: process.env.AWS_BUCKET,
        Key: newKey,
        // Body: file.contents,
        Body: file,
        ContentType: obj.ContentType,
        Metadata: meta.Metadata,
      }, (err) => {
        if (err) return next(err);
        console.log('File uploaded', key);
        return next();
      });
    },
  ], (err, result) => {
    if (err) {
      failureCallback(err);
    } else {
      successCallback(result);
    }
  });
};

export { processImage, suffixFilename };

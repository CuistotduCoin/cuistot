'use strict';

module.exports.ssr = (event, context, callback) => {
  const ssr = require('build/server');
  const html = new ssr();
  context.succeed(html);
};
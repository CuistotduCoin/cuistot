// webpack.config.js
const slsw = require('serverless-webpack'); // eslint-disable-line
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: slsw.lib.entries,
  mode: process.env.NODE_ENV,
  target: 'node',
  // we use webpack-node-externals to excludes all node deps.
  // You can manually set the externals too.
  externals: [nodeExternals()],
  // optimization: {
  //   minimize: false
  // },
};

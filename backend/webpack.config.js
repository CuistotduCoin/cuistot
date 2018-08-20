// webpack.config.js
const slsw = require('serverless-webpack'); // eslint-disable-line
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: slsw.lib.entries,
  mode: process.env.NODE_ENV,
  target: 'node',
  node: { __dirname: false }, // necessary in order to use absolute path with __dirname
  // we use webpack-node-externals to excludes all node deps.
  // You can manually set the externals too.
  externals: [nodeExternals()],
  // optimization: {
  //   minimize: false
  // },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'email-templates',
        to: 'email-templates',
        toType: 'dir',
      },
    ]),
  ],
};

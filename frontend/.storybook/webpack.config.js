const path = require('path');
const TSDocgenPlugin = require("react-docgen-typescript-webpack-plugin");

module.exports = (baseConfig, env, config) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        loader: require.resolve('ts-loader'),
      });
      config.resolve.plugins = config.resolve.plugins || [];

      config.plugins.push(new TSDocgenPlugin());

      const srcPath = path.resolve('./src');
      config.resolve.modules.push(srcPath);

      config.resolve.extensions.push('.ts', '.tsx');
      return config;
};
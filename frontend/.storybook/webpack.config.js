const path = require('path');
const TSDocgenPlugin = require("react-docgen-typescript-webpack-plugin");

module.exports = (baseConfig, env, config) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve("awesome-typescript-loader")
      });

      config.plugins.push(new TSDocgenPlugin());

      const srcPath = path.resolve('./src');
      config.resolve.modules.push(srcPath);

      config.resolve.extensions.push('.ts', '.tsx');
      return config;
};
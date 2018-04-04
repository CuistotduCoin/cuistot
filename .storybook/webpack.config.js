const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
    const config = genDefaultConfig(baseConfig, env);

    // For example, add typescript loader:
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loaders: ['ts-loader']
    });
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
};
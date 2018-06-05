const path = require('path');

module.exports = {
  plugins: ['typescript'],

  modify(config, { target, dev }, webpack) {
    const appConfig = config // stay immutable here
    if (target === 'node' && !dev) {
      appConfig.externals = [];
    }

    const srcPath = path.resolve('./src');
    appConfig.resolve.modules.push(srcPath);
    return appConfig;
  }
};
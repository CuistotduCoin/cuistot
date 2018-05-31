module.exports = {
  plugins: ['typescript'],

  modify(config, { target, dev }, webpack) {
    const appConfig = config // stay immutable here
    if (target === 'node' && !dev) {
      appConfig.externals = [];
    }
    return appConfig;
  }
};
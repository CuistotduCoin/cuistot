'use strict';

module.exports = {

  plugins: ['typescript'],

  modify(config, { target, dev }) {
    
    if (target === 'node' && !dev) {
      config.externals = [];
    }
    return config;
  }
};
'use strict';
module.exports = appInfo => {
  const config = exports = {};
  config.mongoose = {
    clients: {
      default: {
        singleton: 'model', // models in `app/${singleton}`
        singletonSrc: [ 'core/model' ],
        url: 'mongodb://192.168.192.55/clap-mongoose',
        options: {
          user: 'clap',
          pass: 'clap',
          useUnifiedTopology: true,
        },
        framework: 'core-lite',
      },
    },
  };
  return {
    ...config,
  };
};

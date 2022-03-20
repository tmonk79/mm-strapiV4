module.exports = {
redis: {
    config: {
      connections: {
        default: {
          connection: {
            host: 'redis',
            port: 6379,
            db: 0,
          },
          settings: {
            debug: false,
          },
        },
      },
    },
  },
  // Step 2: Configure the redis cache plugin
  "rest-cache": {
    config: {
      provider: {
        name: "redis",
        options: {
          max: 32767,
          connection: "default",
        },
      },
      strategy: {
        contentTypes: [
          // list of Content-Types UID to cache
        ],
      },
    },
  },
};

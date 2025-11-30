/**
 * Development Environment Configuration
 */
module.exports = {
  env: 'development',
  port: process.env.PORT || 3001,
  mongoose: {
    url: process.env.MONGODB_URI || process.env.mongodbUri || 'mongodb://localhost:27017/pickaar-booking-dev',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  cors: {
    origin: '*',
    credentials: true,
  },
  swagger: {
    enabled: true,
    route: '/api-docs',
  },
  logLevel: 'debug',
};


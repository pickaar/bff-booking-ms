/**
 * Staging Environment Configuration
 */
module.exports = {
  env: 'staging',
  port: process.env.PORT || 3001,
  mongoose: {
    url: process.env.MONGODB_URI || process.env.mongodbUri,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    },
  },
  cors: {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
    credentials: true,
  },
  swagger: {
    enabled: true,
    route: '/api-docs',
  },
  logLevel: 'info',
};


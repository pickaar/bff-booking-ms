require('dotenv').config();

const path = require('path');

const env = process.env.NODE_ENV || 'development';

let config;
try {
  config = require(`./environments/${env}`);
} catch (error) {
  console.warn(`Configuration file for environment "${env}" not found. Falling back to development.`);
  config = require('./environments/development');
}

// Validate required configuration
if (!config.mongoose.url) {
  throw new Error(`MongoDB URI is required for environment: ${env}`);
}

module.exports = {
  env: config.env,
  port: config.port,
  environment: env,
  database: {
    mongoConnectUri: config.mongoose.url,
    options: config.mongoose.options,
  },
  cors: config.cors,
  swagger: config.swagger,
  logLevel: config.logLevel,
};
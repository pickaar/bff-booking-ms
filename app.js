const config = require('./src/config/configs');
const app = require('./src/config/express');
const { connectDatabase } = require('./src/config/database');

// Initialize database connection
connectDatabase().then(() => {
  app.listen(config.port, () => {
    console.log(`Server has started on PORT ${config.port} in ${config.env} mode`);
  });
}).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

/**
 * Graceful shutdown
 */
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

/**
 * Exports express
 * @public
 */
module.exports = app;

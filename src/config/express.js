const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const config = require('./configs');
const swaggerSpec = require('./swagger');
const errorHandler = require('../middleware/errorHandler');

const app = express();

// parse body params and attach them to req.body
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors(config.cors));

// Request logging middleware (development only)
if (config.env === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Swagger documentation
if (config.swagger.enabled) {
  app.use(config.swagger.route, swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Pickaar Booking Service API Documentation',
  }));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: config.env,
  });
});

// API routes
app.use('/api', require('../api/routes'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Route not found',
    path: req.path,
  });
});

// Error handler middleware (must be last)
app.use(errorHandler);

module.exports = app;

const swaggerJsdoc = require('swagger-jsdoc');
const config = require('./configs');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pickaar Booking Service API',
      version: '2.0.0',
      description: 'REST API service for Pickaar Customer and Vendor booking management',
      contact: {
        name: 'API Support',
        email: 'support@pickaar.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server',
      },
      {
        url: 'https://api.pickaar.com',
        description: 'Production server',
      },
    ],
    tags: [
      {
        name: 'Bookings',
        description: 'Booking management endpoints',
      },
      {
        name: 'Quotes',
        description: 'Quote management endpoints',
      },
    ],
    components: {
      schemas: {
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'number',
              example: 400,
            },
            message: {
              type: 'string',
              example: 'Error message',
            },
          },
        },
        Success: {
          type: 'object',
          properties: {
            status: {
              type: 'number',
              example: 200,
            },
            message: {
              type: 'string',
              example: 'Success message',
            },
            data: {
              type: 'object',
            },
          },
        },
      },
    },
  },
  apis: [
    './src/api/routes/*.js',
    './src/api/controllers/*.js',
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;


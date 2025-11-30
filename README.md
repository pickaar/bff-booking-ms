# Pickaar REST API Service - Booking Service

This project provides REST API service for Pickaar Customer and Vendor booking management.

## Technology Overview

- **Node.js**: v22.0.0+ (LTS)
- **Express**: Fast, unopinionated web framework
- **MongoDB**: Database with Mongoose ODM
- **Swagger**: API documentation
- **Node Schedule**: Task scheduling

## Prerequisites

- Node.js >= 22.0.0
- npm >= 10.0.0
- MongoDB instance (local or remote)

## Environment Setup

### 1. Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/pickaar-booking
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
SWAGGER_ENABLED=true
```

### 2. Installation

```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm run start:dev
```

Runs the server with nodemon for automatic restarts on file changes.

### Production Mode

```bash
npm run start:prod
```

### Staging Mode

```bash
npm run start:staging
```

## API Documentation

Once the server is running, access Swagger API documentation at:

- **Development**: http://localhost:3001/api-docs
- **Production**: https://your-domain.com/api-docs

## Project Structure

```
pickaarBookingServer/
├── src/
│   ├── api/
│   │   ├── controllers/     # Request handlers
│   │   ├── repositories/    # Data access layer
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── helpers/         # Helper utilities
│   ├── config/
│   │   ├── environments/    # Environment-specific configs
│   │   ├── configs.js       # Main config loader
│   │   ├── database.js      # Database connection
│   │   ├── express.js       # Express app setup
│   │   └── swagger.js       # Swagger configuration
│   ├── middleware/          # Express middleware
│   ├── models/              # Mongoose models
│   ├── schedulers/          # Scheduled tasks
│   └── utils/               # Utility functions
├── app.js                   # Application entry point
└── package.json
```

## API Endpoints

### Bookings

- `GET /api/booking/getActiveBooking/:phoneNo` - Get active booking by phone number
- `GET /api/booking/tollRoute` - Get toll details for a route
- `POST /api/booking/initCabBooking` - Initialize a new cab booking
- `POST /api/booking/getCabBookingList` - Get booking list by filters
- `GET /api/booking/getCabBookingListByPhoneNo` - Get booking list by phone number
- `POST /api/booking/finalizeBooking` - Finalize a booking

### Quotes

- `POST /api/quote/newQuote` - Create a new quote
- `GET /api/quote/getQuotes/:bookingId` - Get quotes by booking ID

## Health Check

- `GET /health` - Server health check endpoint

## Environment Configurations

The application supports multiple environments:

- **Development** (`NODE_ENV=development`): Full logging, Swagger enabled
- **Staging** (`NODE_ENV=staging`): Production-like with Swagger enabled
- **Production** (`NODE_ENV=production`): Optimized, Swagger optional

Configuration files are located in `src/config/environments/`.

## Code Quality

### Linting

```bash
npm run lint
```

### Fix Linting Issues

```bash
npm run fix
```

## Architecture Principles

This project follows:

- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **DRY Principle**: Don't Repeat Yourself - reusable components and utilities
- **Repository Pattern**: Separation of data access logic
- **Service Layer**: Business logic abstraction

## Contributing

1. Follow the existing code structure
2. Maintain SOLID and DRY principles
3. Add Swagger documentation for new endpoints
4. Write descriptive commit messages

## License

ISC
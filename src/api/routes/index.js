const express = require('express');
const router = express.Router();

/**
 * @route /api/booking
 * @route /api/quote
 */
const bookingRoute = require('./bookings.route');
const quoteRoute = require('./quotes.route');

router.use('/booking', bookingRoute);
router.use('/quote', quoteRoute);


module.exports = router;
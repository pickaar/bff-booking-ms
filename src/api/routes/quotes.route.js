const express = require('express');

const router = express.Router();
const controller = require('../controllers/quotes.controller');

/**
 * @swagger
 * /api/quote/newQuote:
 *   post:
 *     summary: Create a new quote for a booking
 *     description: Vendor App. Creates a new quote for an existing booking. Maximum 15 quotes per booking.
 *     tags: [Quotes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookingId
 *               - newQuote
 *             properties:
 *               bookingId:
 *                 type: string
 *                 description: Booking ID
 *               newQuote:
 *                 type: object
 *                 description: New quote details
 *             example:
 *               bookingId: "6930b6dadea9178c2deb2cec"
 *               quote:
 *                 actualQuotedAmount: 1500
 *                 extraKM: 20
 *                 beta: 0
 *                 isNegotiable: true
 *                 bookingPrivilege: "RECOMMENDED"
 *                 vehicleId: "6930b8e98b249b7774f232eb"
 *                 vendorId: "692fc0cdb5dea3de97ba20fd"
 *     responses:
 *       200:
 *         description: Quote created successfully
 *       400:
 *         description: Invalid quote data or quote limit reached
 */
router.route('/newQuote').post(controller.initNewQuotes);

/**
 * @swagger
 * /api/quote/getQuotes/{bookingId}:
 *   get:
 *     summary: Get quotes by booking ID
 *     description: Returns all quotes for a specific booking
 *     tags: [Quotes]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Quotes retrieved successfully
 *       404:
 *         description: No quotes found for this booking
 */
router.route('/getQuotes/:bookingId').get(controller.getQuotes);

module.exports = router;
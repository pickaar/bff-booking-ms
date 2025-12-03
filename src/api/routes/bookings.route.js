const express = require('express');

const router = express.Router();
const controller = require('../controllers/bookings.controller');

/**
 * @swagger
 * /api/booking/getActiveBooking/{phoneNo}:
 *   get:
 *     summary: Get active booking by phone number
 *     description: Will be used by Customer App on launch to check if any active Booking exists. Costly API - use only if Booking details are not available in App storage.
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: phoneNo
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer phone number
 *     responses:
 *       200:
 *         description: Active booking details
 *       404:
 *         description: No active booking found
 */
router.route('/getActiveBooking/:phoneNo').get(controller.getActiveBooking);

/**
 * @swagger
 * /api/booking/tollRoute:
 *   get:
 *     summary: Get toll details for a route
 *     tags: [Bookings]
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *         description: The starting point of the route.
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *         description: The destination of the route.
 *     responses:
 *       200:
 *         description: Route toll data available
 */
router.route('/tollRoute').get(controller.getTollDetails);

/**
 * @swagger
 * /api/booking/newBooking:
 *   post:
 *     summary: Initialize a new cab booking
 *     description: Creates a new cab booking and sends notifications to vendors
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - booking
 *             properties:
 *               booking:
 *                 type: object
 *     responses:
 *       200:
 *         description: Successfully created new cab booking
 *       400:
 *         description: Invalid booking data
 */
router.route('/newBooking').post(controller.initCabBooking);
/**
 * @swagger
 * /api/booking/getBookingsByUserID:
 *   get:
 *     summary: Get cab booking list by User ID
 *     description: Customer App. Costly API. Returns booking list by User ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: query
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer User ID
 *     responses:
 *       200:
 *         description: Booking list found
 *       404:
 *         description: No bookings found
 */
router.route('/getBookingsByUserID').get(controller.getBookingsByUserID);

/**
 * @swagger
 * /api/booking/getCabBookingList:
 *   post:
 *     summary: Get cab booking list by filters
 *     description: Vendor App. Costly API. Returns active list of bookings based on filters
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicleType:
 *                 type: string
 *                 enum: [HATCHBACK, SEDAN, SUV, MUV, VAN, AUTO]
 *               district:
 *                 type: string
 *               pickUpDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: List of bookings found
 */
router.route('/getCabBookingList').post(controller.getCabBookingList);


/**
 * @swagger
 * /api/booking/finalizeBooking:
 *   post:
 *     summary: Finalize a booking
 *     description: Moves booking from active to finalized state
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - booking
 *               - quote
 *               - vendor
 *             properties:
 *               booking:
 *                 type: object
 *               quote:
 *                 type: object
 *               vendor:
 *                 type: object
 *     responses:
 *       200:
 *         description: Booking finalized successfully
 */
router.route('/finalizeBooking').post(controller.finalizeBooking);

module.exports = router;
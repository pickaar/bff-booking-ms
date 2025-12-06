const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Address Schema (remains embedded as it's context-specific to the booking)
const address = new Schema({
    latlng: {
        type: { type: String, default: "Point" },
        coordinates: { type: [Number] }
    },
    flatHouseNo: { type: String },
    buildingStreet: { type: String },
    locality: { type: String },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String },
    pincode: { type: Number },
}, { _id: false });

const keyValueSchema = new Schema({
    text: { type: String },
    value: { type: Number }
}, { _id: false });

var bookingsSchema = new Schema({
    bookingStatus: {
        type: String,
        default: "IDLE",
        enum: ["IDLE", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cust_users',
        required: true
    },

    pickupAddress: { type: address, required: true },
    dropAddress: { type: address, required: true },
    pickUpDate: { type: Date, required: true },
    vehicleType: {
        type: String,
        enum: ['HATCHBACK', 'SEDAN', 'SUV', 'MUV', 'VAN', 'AUTO'],
        required: true
    },
    seaters: {
        type: Number,
        required: true
    },
    tripType: { type: Number, required: true, default: 1 },
    returnDate: { type: Date },
    comments: { type: String },
    distance: { type: keyValueSchema },
    duration: { type: keyValueSchema },
    isTollAvailable: { type: Boolean },
    isBookingForOthers: { type: Boolean, default: false },
    OthersPhoneNo: { type: Number, minLength: 7, maxLength: 12 },
    OthersName: { type: String },
    isSingleWomen: { type: Boolean, default: false },
    pickaarCommission: { type: Number },
    bookingType: { type: String, enum: ['VEHICLE_BOOKING', 'ACTING_DRIVER_BOOKING'], default: 'VEHICLE_BOOKING' },
    createdAt: { type: Date, default: Date.now },
});

// --- INDEX DEFINITIONS ---

// Geospatial Indexes
bookingsSchema.index({ 'pickupAddress.latlng': '2dsphere' });
bookingsSchema.index({ 'dropAddress.latlng': '2dsphere' });

// Strategic Index on the User Reference
bookingsSchema.index({ user: 1 });
bookingsSchema.index({ bookingStatus: 1, user: 1 });

const bookingsModel = mongoose.model('vehicle_bookings', bookingsSchema)

module.exports = bookingsModel;
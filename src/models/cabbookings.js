const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const address = new Schema({
    latlng: { 
        type: { type: String, default: "Point" }, 
        coordinates: { type: [Number] } // Explicitly define as an array of Numbers
    },
    flatHouseNo: { type: String },
    buildingStreet: { type: String },
    locality: { type: String },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String},
    pincode: { type: Number },
}, { _id: false })

const userSchma = new Schema({
    phoneNo: { type: Number, required: true, minLength: 7, maxLength: 12 },
    userName: { type: String },
    emailId: { type: String }
});

const keyValueSchema = new Schema({
    text: { type: String },
    value: { type: Number }
}, { _id: false });

var bookingsSchema = new Schema({
    bookingStatus: { type: Boolean, default: false },
    user: { type: userSchma, required: true },
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
    tripType: { type: Number, required: true, default: 1 }, // 1 - ONE WAY, 2 - ROUND TRIP
    returnDate: { type: Date },
    comments: { type: String },
    distance: { type: keyValueSchema },
    duration: { type: keyValueSchema },
    isTollAvailable: { type: Boolean },
    isBookingForOthers: { type: Boolean, default: false },
    OthersPhoneNo: { type: Number, minLength: 7, maxLength: 12 },
    OthersName: { type: String },
    isSingleWomen: { type: Boolean, default: false },
    pickaarCommission: { type: Number},
});

/// --- GEOSPATIAL INDEX DEFINITIONS ---

// 1. Index for Pickup Address Coordinates
// This creates a 2dsphere index on the 'latlng' sub-field within the 'pickupAddress' object.
// This is necessary for efficient geo-spatial queries (e.g., finding nearby cabs to the pickup location).
bookingsSchema.index({ 'pickupAddress.latlng': '2dsphere' });

// 2. Index for Drop Address Coordinates
// Similarly, this creates a 2dsphere index on the drop location.
bookingsSchema.index({ 'dropAddress.latlng': '2dsphere' });


const bookingsModel = mongoose.model('cabbookings', bookingsSchema)


// bookingsModel.createIndexes({ vendorPhoneNo: 1 });

module.exports = bookingsModel;
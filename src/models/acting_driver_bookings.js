const mongoose = require('mongoose');
const { Schema } = mongoose;
const addressSchema = new Schema({
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
    address: { type: String},
    pincode: { type: Number },
}, { _id: false });

const actingDriverBookingSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cust_users',
        required: true
    },
    pickupAddress: {
        type: addressSchema,
        required: true,
    },
    dropAddress: {
        type: addressSchema,
        required: true,
    },
    returnDate: { type: Date },
    pickUpDate: { type: Date, required: true },
    duration: {
        type: Number, // Duration in minutes
        required: true,
    },
    status: {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
        default: 'PENDING',
    },
    comments: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

const ActingDriverBooking = mongoose.model('acting_driver_bookings', actingDriverBookingSchema);

module.exports = ActingDriverBooking;
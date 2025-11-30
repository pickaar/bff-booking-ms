const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const address = new Schema({
//     name: { type: String },
//     loc: { type: { type: String, default: "Point" }, coordinates: [Number] },
//     address: { type: String, required: true },
//     address2: { type: String },
//     pincode: { type: Number },
//     district: { type: String, required: true },
// }, { _id: false });

const address = new Schema({
    latlng: { type: { type: String, default: "Point" }, coordinates: [Number] },
    flatHouseNo: { type: String },
    buildingStreet: { type: String },
    locality: { type: String },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: Number },
}, { _id: false })

const userSchma = new Schema({
    phoneNo: { type: Number, required: true, minLength: 7, maxLength: 12 },
    userName: { type: String },
    emailId: { type: String }
});

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
    distance: { type: String },
    duration: { type: String },
    isTollAvailable: { type: Boolean },
    isBookingForOthers: { type: Boolean, default: false },
    OthersPhoneNo: { type: Number, minLength: 7, maxLength: 12 },
    OthersName: { type: String },
    isSingleWomen: { type: Boolean, default: false },
    pickaarCommission: { type: Number},
});

// bookingsSchema.path('pickUpDate').validate(function (n) {
//     return false;
// }, 'HOLLA NOT WORKING');

const bookingsModel = mongoose.model('cabbookings', bookingsSchema)


// bookingsModel.createIndexes({ vendorPhoneNo: 1 });

module.exports = bookingsModel;
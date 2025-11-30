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
    flatHouseNo: { type: String, required: true },
    buildingStreet: { type: String },
    locality: { type: String, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: Number },
}, { _id: false })

const userSchma = new Schema({
    phoneNo: { type: Number, required: true, minLength: 7, maxLength: 12, index: true },
    emailId: { type: String },
    name: { type: String, required: true },
    fcmToken: { type: String }
});

const bookingsSchema = new Schema({
    bookingStatus: { type: Boolean, default: false },
    user: { type: userSchma, required: true },
    pickupAddress: { type: address, required: true },
    dropAddress: { type: address, required: true },
    pickUpDate: { type: String, required: true },
    pickUpTime: { type: String, required: true },
    vehicleType: {
        type: String,
        enum: ['HATCHBACK', 'SEDAN', 'SUV', 'MUV', 'VAN', 'OTHER'],
        required: true
    },
    seaters: {
        type: Number,
        required: true
    },
    tripType: { type: Number, required: true, default: 1 },
    returnDate: { type: String },
    comments: { type: String },
    distance: { type: String, required: true },
    duration: { type: String, required: true },
    isTollAvailable: { type: Boolean, required: true },
    isBookingForOthers: { type: Boolean, default: false },
    OthersPhoneNo: { type: Number, minLength: 7, maxLength: 12 },
    OthersName: { type: String },
    isSingleWomen: { type: Boolean, default: false }
});

const quoteSchema = new Schema({
    quotedAmt: { type: Number, required: true },
    extraKM: { type: Number, required: true },
    beta: { type: Number, required: true },
    save: { type: Number, required: true },
    isNegotiable: { type: Boolean, required: true },
    bookingPrivilege: { type: String, required: true },
    quotedAproxAmt: { type: Number, required: true },
    pickaarCommission: { type: Number, required: true },
});

const vendorSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    exp: { type: Number, required: true },
    starRating: { type: Number, required: true },
    vendorId: { type: mongoose.Types.ObjectId },
    car: {
        carModel: { type: String, required: true },
        carDetails: { type: String, required: true },
        carLuggage: { type: Number, required: true }
    }
});

const activeCabBookings = new Schema({
    booking: { type: bookingsSchema },
    quote: { type: quoteSchema },
    vendor: { type: vendorSchema },
    createdOn: { type: Date, default: Date.now }
});

const activecabbookings = mongoose.model('activecabbookings', activeCabBookings)

module.exports = activecabbookings;
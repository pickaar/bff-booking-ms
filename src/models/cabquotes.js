const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const address = new Schema({
    name: { type: String },
    loc: { type: { type: String, default: "Point" }, coordinates: [Number] },
    address: { type: String, required: true },
    address2: { type: String },
    pincode: { type: Number },
    district: { type: String, required: true },
}, { _id: false });

const quote = new Schema({
    bookingDetails: {
        pickupAddress: { type: address, required: true },
        dropAddress: { type: address, required: true },
        distance: { type: Number, required: true },
        duration: { type: String, required: true },
        tripType: { type: Number, required: true, default: 1 },
        seaters: {
            type: Number,
            required: true
        },
        pickUpDate: { type: String, required: true },
        pickUpTime: { type: String, required: true },
        returnDate: { type: String }
    },
    quote: {
        quotedAmt: { type: Number, required: true },
        extraKM: { type: Number, required: true },
        beta: { type: Number, required: true },
        save: { type: Number, required: true },
        isNegotiable: { type: Boolean, required: true },
        bookingPrivilege: { type: String, required: true },
        quotedAproxAmt: { type: Number, required: true },
        pickaarCommission: { type: Number, required: true },
    },
    car: {
        carModel: { type: String, required: true },
        carDetails: { type: String, required: true },
        carLuggage: { type: Number, required: true }
    },
    vendor: {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        exp: { type: Number, required: true },
        starRating: { type: Number, required: true },
        vendorId: { type: mongoose.Types.ObjectId },
    }
})

const cabQuotesSchema = new Schema({
    bookingRefId: { type: mongoose.Types.ObjectId, unique: true },
    quotesList: [quote]
});


const cabQuotesModel = mongoose.model('cabquotes', cabQuotesSchema);
cabQuotesModel.createIndexes({ bookingRefId: 1 });

module.exports = cabQuotesModel;

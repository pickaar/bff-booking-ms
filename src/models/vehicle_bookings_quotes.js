const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const quote = new Schema({
    actualQuotedAmount: { type: Number, required: true },
    pickaarCommission: { type: Number, required: true },
    finalQuotedAmount: { type: Number, required: true },// Includes commission and beta
    extraKM: { type: Number, required: true },
    beta: { type: Number, required: true },
    save: { type: Number, required: true },
    isNegotiable: { type: Boolean, required: true },
    bookingPrivilege: {
        type: String,
        required: true,
        enum: ['ECONOMY', 'RECOMMENDED', 'PREMIUM','REGULAR'], default: 'ECONOMY'
    },
    vehicleId: { type: mongoose.Types.ObjectId },
    vendorId: { type: mongoose.Types.ObjectId },
    createdAt: { type: Date, default: Date.now }
})

const vehicleQutesSchema = new Schema({
    bookingRefId: { type: mongoose.Types.ObjectId, unique: true },
    quotesList: [quote]
});

const vehicleQuotesModel = mongoose.model('vehicle_bookings_quotes', vehicleQutesSchema);
vehicleQuotesModel.createIndexes({ bookingRefId: 1 });

module.exports = vehicleQuotesModel;
export function parseQuoteResponse(quote, vendor, vehicle, booking) {
    return {
        quoteId: quote._id,
        vendorName: vendor.name,
        vendorId: vendor._id,
        vendorStarRating: "4.5",
        vendorExp: vendor.exp,
        vendorCarType: vehicle.vehicleType,
        vendorCarName: vehicle.vehicleName,
        vendorLuggageCapacity: vehicle.vehicleLuggage,
        bookingPrivilege: quote.bookingPrivilege,
        quotedAmtByKM: quote.extraKM,
        save: quote.save,
        isNegotiable: quote.isNegotiable,
        quotedAproxAmt: quote.finalQuotedAmount,
        feedbackDetails: {},
        moreInfo: [
            {
                title: "Driver & Vehicle Details",
                titleSize: "small",
                list: [
                    {
                        key: "Name",
                        value: vendor.name,
                        valueType: "text",
                        type: "singleLine"
                    },
                    {
                        key: "Age",
                        value: vendor.age,
                        valueType: "text",
                        type: "singleLine"
                    },
                    {
                        key: "Car Details",
                        value: vehicle.vehicleName,
                        type: "multiLineWithInfo",
                        info: "Minimal luggage space and compact modal",
                        modalType: "CAR_DETAIL_MODAL",
                        modalContent: {}
                    },
                    {
                        key: "Ratings, Feedbacks & Badges",
                        type: "singleLine",
                        valueType: "redirect",
                        navigateTo: "feedback"
                    }
                ]
            },
            {
                title: "Travel Details",
                titleSize: "small",
                list: [
                    {
                        type: "multiLine",
                        key: "From Address",
                        value: booking.pickupAddress.address
                    },
                    {
                        type: "multiLine",
                        key: "To Address",
                        value: booking.dropAddress.address,
                        style: "{ borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: themeColors.gray}"
                    },
                    {
                        key: "Approximate Distance",
                        value: booking.distance.text + " Km",
                        valueType: "text",
                        type: "singleLine"
                    },
                    {
                        key: "Approximate Travel Time",
                        value: booking.duration.text,
                        valueType: "text",
                        type: "singleLine"
                    },
                    {
                        key: "Travel type",
                        value: "Outstaion",
                        valueType: "text",
                        type: "singleLine"
                    },
                    {
                        key: "No. Of passangers",
                        value: booking.seaters,
                        valueType: "text",
                        type: "singleLine"
                    },
                    {
                        key: "Start Date & Time",
                        value: booking.pickUpDate.toLocaleString("en-US", { day: '2-digit', month: 'long', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }),
                        valueType: "text",
                        type: "singleLine"
                    },
                    (booking.returnDate && {
                        key: "Return Date & Time",
                        value: booking.returnDate.toLocaleString("en-US", { day: '2-digit', month: 'long', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }),
                        valueType: "text",
                        type: "singleLine"
                    })
                ]
            },
            {
                title: "Driver & Vehicle Details",
                titleSize: "small",
                list: [
                    {
                        key: "Driver Quoted Per Km",
                        value: Math.round(quote.finalQuotedAmount / booking.distance.value) + "/Km",
                        valueType: "text",
                        type: "singleLine"
                    },
                    {
                        key: "Extra KM",
                        value: quote.extraKM + "/Km",
                        type: "multiLineWithInfo",
                        info: "This charge applicable for additional KM.",
                        modalType: "INFO",
                        modalContent: "This charge applicable for additional KM."
                    },
                    {
                        key: "Driver Beta",
                        value: quote.beta,
                        type: "multiLineWithInfo",
                        info: "Driver beta applicable for Outstation trips only.",
                        modalType: "INFO",
                        modalContent: "Driver beta applicable for Outstation trips only."
                    },
                    {
                        key: "Toll Charges",
                        value: "Excluded",
                        type: "multiLineWithInfo",
                        info: "You need to pay directly to driver before crossing Tolls.",
                        modalType: "INFO",
                        modalContent: "You need to pay directly to driver before crossing Tolls."
                    },
                    {
                        key: "State Tax",
                        value: "Excluded",
                        type: "multiLineWithInfo",
                        info: "You need to pay directly to driver before entering other States.",
                        modalType: "INFO",
                        modalContent: "You need to pay directly to driver before entering other States."
                    }
                ]
            }
        ]
    };
}
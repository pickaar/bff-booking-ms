

// {
//     "travelDetail": {
//         "fromAddress": "1/13, 2nd New Street, Tiru Nagar, Katpadi, Vellore PinCode - 632006",
//         "toAddress": "1/13, 2nd New Street, Tiru Nagar, Katpadi, Vellore PinCode - 632006",
//         "distance": "129 Km",
//         "duration": "1 Hr",
//         "travelType": "Outstaion",
//         "noOfPassangers": "4",
//         "startDate": "23, April22 - 08: 30 AM",
//         "returnDate": "24, April22 - 08: 30 AM",
//         "quote": "28/Km",
//         "extraKM": "31/Km",
//         "beta": "500",
//         "save": "14%",
//         "isNegotiable": true,
//         "bookingPrivilege": "Recommended",
//         "quotedAproxAmt": "1405"
//     },
//     "car": {
//         "carModel": "SUV",
//         "carDetails": "Minimal luggage space and compact modal",
//         "carLuggage": "350"
//     },
//     "vendor": {
//         "vname": "Vinoth",
//         "vage": 33,
//         "vendorExp": "12",
//         "vendorStarRating": "4.2",
//         "vendorId": "65465asdf46354",
//     }
// }

exports.frameQuoteObject = (quote) => {
    const framedObj = {
        "quoteId": 634563456,
        "vendorName": "Aravid",
        "vendorId": "65465asdf46354",
        "moreInfo": [
            {
                "title": "Driver & Vehicle Details",
                "titleSize": "small",
                "list": [
                    {
                        "key": "Name",
                        "value": "Kameeshwaran Viswanathan",
                        "valueType": "text",
                        "type": "singleLine"
                    },
                    {
                        "key": "Age",
                        "value": 33,
                        "valueType": "text",
                        "type": "singleLine"
                    },
                    {
                        "key": "Car Details",
                        "value": "Ritz",
                        "type": "multiLineWithInfo",
                        "info": "Minimal luggage space and compact modal",
                        "modalType": "CAR_DETAIL_MODAL",
                        "modalContent": {}
                    },
                    {
                        "key": "Ratings, Feedbacks & Badges",
                        "type": "singleLine",
                        "valueType": "redirect",
                        "navigateTo": "feedback"
                    }
                ]
            },
            {
                "title": "Travel Details",
                "titleSize": "small",
                "list": [
                    {
                        "type": "multiLine",
                        "key": "From Address",
                        "value": "1/13, 2nd New Street, Tiru Nagar, Katpadi, Vellore PinCode - 632006"
                    },
                    {
                        "type": "multiLine",
                        "key": "To Address",
                        "value": "S1, Sherwood Apartment, 4th VGP Prabhu Nagar,Perumbakkam, Chennai - 600100",
                        "style": "{ borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: themeColors.gray}"
                    },
                    {
                        "key": "Approximate Distance",
                        "value": "129 Km",
                        "valueType": "text",
                        "type": "singleLine"
                    },
                    {
                        "key": "Approximate Travel Time",
                        "value": "3 hrs,10 min",
                        "valueType": "text",
                        "type": "singleLine"
                    },
                    {
                        "key": "Travel type",
                        "value": "Outstaion",
                        "valueType": "text",
                        "type": "singleLine"
                    },
                    {
                        "key": "No. Of passangers",
                        "value": "4 Persons",
                        "valueType": "text",
                        "type": "singleLine"
                    },
                    {
                        "key": "Start Date & Time",
                        "value": "23, April22 - 08: 30 AM",
                        "valueType": "text",
                        "type": "singleLine"
                    },
                    {
                        "key": "Return Date & Time",
                        "value": "23, April22 - 08: 30 AM",
                        "valueType": "text",
                        "type": "singleLine"
                    }
                ]
            },
            {
                "title": "Driver & Vehicle Details",
                "titleSize": "small",
                "list": [
                    {
                        "key": "Driver Quoted Per Km",
                        "value": "28/Km",
                        "valueType": "text",
                        "type": "singleLine"
                    },
                    {
                        "key": "Extra KM",
                        "value": "31/Km",
                        "type": "multiLineWithInfo",
                        "info": "This charge applicable for additional KM.",
                        "modalType": "INFO",
                        "modalContent": "This charge applicable for additional KM."
                    },
                    {
                        "key": "Driver Beta",
                        "value": " 500",
                        "type": "multiLineWithInfo",
                        "info": "Driver beta applicable for Outstation trips only.",
                        "modalType": "INFO",
                        "modalContent": "Driver beta applicable for Outstation trips only."
                    },
                    {
                        "key": "Toll Charges",
                        "value": "Excluded",
                        "type": "multiLineWithInfo",
                        "info": "You need to pay directly to driver before crossing Tolls.",
                        "modalType": "INFO",
                        "modalContent": "You need to pay directly to driver before crossing Tolls."
                    },
                    {
                        "key": "State Tax",
                        "value": "Excluded",
                        "type": "multiLineWithInfo",
                        "info": "You need to pay directly to driver before entering other States.",
                        "modalType": "INFO",
                        "modalContent": "You need to pay directly to driver before entering other States."
                    }
                ]
            }
        ]
    }
    return framedObj;
}

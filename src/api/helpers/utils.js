const date = require('date-and-time');
const { PICKAAR_COMMISSION_AMT } = require('./constants/constant');

exports.currentDate = () => {
    const now = new Date();
    return date.format(now, 'DD/MM/YYYY HH:mm:ss');
}

exports.addMonth = (now, months) => {
    const cur = date.parse(now, 'DD/MM/YYYY HH:mm:ss');
    const addedMonths = date.addMonths(cur, months);
    return date.format(addedMonths, 'DD/MM/YYYY HH:mm:ss');
}


exports.getDistance = (distanceStr) => {
    return parseInt(distanceStr.split(" ")[0])
}

exports.calculatePickaarCommission = (distance) => {
    if (!distance)
        return 20;

    return Math.round(distance * PICKAAR_COMMISSION_AMT);
}

exports.calculateNewQuoteParams = async (quote, distance) => {
    const quotedAmt = quote.quotedAmt * distance;
    const beta = quote.beta || 0;
    const pickaarCommission = quote.pickaarCommission || 0;
    const total = quotedAmt + beta + pickaarCommission;

    console.log(quote.quotedAmt + "INSIDE" + total)

    return Object.assign({}, {
        quotedAproxAmt: Math.round(parseInt(total)),
        save: 14
    })

}

//Not used  
exports.splitAncConvert = (strWithInt) => {
    const str = strWithInt;
    const patt1 = /[0-9]/g;
    const patt2 = /[a-zA-Z]/g;
    const letters = str.match(patt2);
    const digits = str.match(patt1).join('');
    return [digits, letters]
}

exports.convertStringToISODate = (strDate, strTime) => {
    //DD/MM/YYYY 
    //hh:mm:ss
    try {
        console.log(`Date: ${strDate}`);
        console.log(`Time: ${strTime}`);
        const time = strTime ? strTime : '00:00:00';
        const isValidFormat = date.isValid(strDate + ' ' + time, 'DD/MM/YYYY hh:mm:ss')
        console.log(isValidFormat)
        if (!isValidFormat)
            return [false, 'Invalid Date Format. Valid Format Should Be Date:DD/MM/YYYY Time: hh:mm:ss']

        const pattern = date.compile('DD/MM/YYYY hh:mm:ss');
        const dateObj = date.parse(strDate + ' ' + time, pattern);
        return [true, new Date(dateObj)];

    } catch (e) {
        return [false, e]
    }
}
const schedule = require('node-schedule');
const db = require('../models');


/**
 * @UsedBy Used on InitCabBooking function
 * @Description used to send push notifcation and other future functionality  
*/

exports.sendPushNotificationToUserForNewQuote = async (bookingId, time) => {
    const startTime = new Date(Date.now() + time);
    schedule.scheduleJob(startTime, async function () {
        const userFCM = await db.cabbookings.findById(bookingId, { user: 1 });
        console.log(`Send Notification to this customer ${userFCM} for new Quote arraival`);
    });
    return
}
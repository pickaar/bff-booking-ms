
const schedule = require('node-schedule');
const db = require('../models');
/**
 * @UsedBy Used on InitCabBooking function
 * @Description used to send push notifcation and other future functionality  
*/

exports.sendPushNotificationToDrivers = async (topic, time) => {
    const startTime = new Date(Date.now() + time);
    schedule.scheduleJob(startTime, function () {
        console.log(`Notification need to send to all ${topic} Drivers`);
    });
    return
}

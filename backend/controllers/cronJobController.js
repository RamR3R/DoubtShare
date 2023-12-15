const cron = require('cron');
const Tutor = require('../models/tutor.model');

const cronJobController = {};

cronJobController.updateRealTimeAvailableTutors = cron.schedule('* * * * * *', async () => {
  try {
    const currentTime = new Date();

    // Find tutors whose last ping time is within the last minute
    const onlineTutors = await Tutor.find({
      lastPingTime: { $gte: new Date(currentTime - 60 * 1000) },
    });

    // You can perform any further actions based on the online tutors, e.g., update availability status

    console.log('Real-time available tutors updated successfully');
  } catch (error) {
    console.error(error);
  }
});

module.exports = cronJobController;

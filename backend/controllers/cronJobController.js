const cron = require('cron');
const Tutor = require('../models/tutor.model');
const { Op } = require('sequelize');

const cronJobController = {};

cronJobController.updateRealTimeAvailableTutors = cron.schedule('* * * * * *', async () => {
  try {
    const currentTime = new Date();
    const thresholdTime = new Date(currentTime - 60 * 1000);

    // Find tutors whose last ping time is within the last minute
    const onlineTutors = await Tutor.findAll({
      where: {
        lastPingTime: {
          [Op.gte]: thresholdTime,
        },
      },
    });

    // You can perform any further actions based on the online tutors, e.g., update availability status

    console.log('Real-time available tutors updated successfully');
  } catch (error) {
    console.error(error);
  }
});

module.exports = cronJobController;

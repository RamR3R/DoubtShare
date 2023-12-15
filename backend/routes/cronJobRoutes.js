const express = require('express');
const cronJobController = require('../controllers/cronJobController');

const router = express.Router();

// Define CRON job-related routes
router.get('/send-doubt-reminders', (req, res) => {
  cronJobController.sendDoubtReminders.start();
  res.json({ message: 'Doubt reminder job scheduled' });
});

router.get('/clean-up-old-doubts', (req, res) => {
  cronJobController.cleanUpOldDoubts.start();
  res.json({ message: 'Clean up old doubts job scheduled' });
});

module.exports = router;

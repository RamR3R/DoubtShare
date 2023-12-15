// routes/pollingRoutes.js
const express = require('express');
const pollingController = require('../controllers/pollingController');

const router = express.Router();

// Define polling-related routes
router.post('/ping', pollingController.updatePing);

module.exports = router;

// routes/doubtRoutes.js
const express = require('express');
const doubtController = require('../controllers/doubtController');

const router = express.Router();

// Define doubt-related routes
router.get('/doubt-history', doubtController.getDoubtHistory);

module.exports = router;

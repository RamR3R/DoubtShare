// routes/tutorRoutes.js
const express = require('express');
const tutorController = require('../controllers/tutorController');

const router = express.Router();

// Define tutor-related routes
router.get('/available-tutors', tutorController.getAvailableTutors);
router.post('/create-doubt-request', tutorController.assignDoubt);

module.exports = router;

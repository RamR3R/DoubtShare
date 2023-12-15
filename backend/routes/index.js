const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');
const DoubtController = require('../controllers/doubtController');
const TutorController = require('../controllers/tutorController');

// Authentication Routes
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/register-tutor', AuthController.registerTutor); 
router.get('/student',AuthController.getStudent)

// Doubt Routes
router.post('/create-doubt', DoubtController.createDoubtRequest);
router.get('/doubt-history/:userId', DoubtController.getDoubtHistory);

// Tutor Routes
router.get('/available-tutors', TutorController.getAvailableTutors);
router.post('/assign-doubt', TutorController.assignDoubt);

module.exports = router;

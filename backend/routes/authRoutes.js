// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Define authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/registertutor',authController.registerTutor)
module.exports = router;

const User = require('../models/user');
const Tutor = require('../models/tutor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const AuthController = {};

AuthController.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    const tutor = await Tutor.findOne({ email });

    if (!user && !tutor) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const validPassword = user ? await bcrypt.compare(password, user.password) : await bcrypt.compare(password, tutor.password);
    
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate and send token
    const token = jwt.sign({ userId: user ? user._id : tutor._id }, process.env.JWT_SECRET);
    return res.json({ message: 'Login successful', user: user ? user : tutor, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
AuthController.getStudent =async(req,res)=>{ 
  try {
    const students = await User.find();
    res.status(200).json(students);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
}
AuthController.register = async (req, res) => {
  const { email, password, language, type, classGrade } = req.body;

  // Validate input and user type
  if (!email || !password || !language || !type || !classGrade) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check for existing user or tutor
    const existingUser = await User.findOne({ email });
    const existingTutor = await Tutor.findOne({ email });

    if (existingUser || existingTutor) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      language,
      type,
      classGrade,
    });

    // Generate and send token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return res.status(201).json({ message: 'User created successfully', user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

AuthController.registerTutor = async (req, res) => {
  const { email, name, language, classGrade, subjects } = req.body;

  // Validate input
  if (!email || !name || !language || !classGrade || !subjects) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check for existing tutor or user
    const existingTutor = await Tutor.findOne({ email });
    const existingUser = await User.findOne({ email });

    if (existingTutor || existingUser) {
      return res.status(409).json({ message: 'Tutor already exists' });
    }

    // Create tutor
    const tutor = await Tutor.create({
      email,
      name,
      language,
      classGrade,
      subjects,
    });

    // Generate and send token
    const token = jwt.sign({ tutorId: tutor._id }, process.env.JWT_SECRET);
    return res.status(201).json({ message: 'Tutor created successfully', tutor, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = AuthController;

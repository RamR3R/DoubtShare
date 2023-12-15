const DoubtRequest = require('../models/doubtRequest');
const User = require('../models/user');
const Tutor = require('../models/tutor');
const MailService = require('../services/mailService'); // Import MailService

const DoubtController = {};

DoubtController.createDoubtRequest = async (req, res) => {
  const { userId, subject, question } = req.body;

  try {
    // Check if the user exists and is a student
    const student = await User.findOne({ _id: userId, type: 'Student' });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Find online tutors matching the subject, language, and classGrade
    const onlineTutors = await Tutor.find({
      availability: true,
      subjects: subject,
      language: student.language,
      classGrade: student.classGrade,
    });

    // If there are no online tutors, provide feedback to the student
    if (onlineTutors.length === 0) {
      return res.status(404).json({ message: 'No available tutors for the given subject' });
    }

    // Assign the doubt request to the first online tutor
    const assignedTutor = onlineTutors[0];

    // Create the doubt request
    const doubtRequest = await DoubtRequest.create({
      studentId: userId,
      subject,
      question,
      assignedTutorId: assignedTutor._id,
    });

    // Send notification to the assigned tutor using MailService
    const tutorEmail = assignedTutor.email; // Assuming you have 'email' field in Tutor model
    const notificationSubject = 'New Doubt Request';
    const notificationMessage = `You have a new doubt request in ${subject} from ${student.username}.`;

    // Use MailService to send email
    await MailService.sendEmail(tutorEmail, notificationSubject, notificationMessage);

    // Provide success response
    return res.status(201).json({ message: 'Doubt request created successfully', doubtRequest });
  } catch (error) {
    console.error('Error creating doubt request:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

DoubtController.getDoubtHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if the user exists and is a student
    const student = await User.findOne({ _id: userId, type: 'Student' });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Retrieve doubt history for the student
    const doubtHistory = await DoubtRequest.find({ studentId: userId }).sort({ createdAt: -1 });

    // Provide success response
    return res.json({ message: 'Doubt history retrieved successfully', doubtHistory });
  } catch (error) {
    console.error('Error retrieving doubt history:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = DoubtController;

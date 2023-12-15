// mailService.js
const nodemailer = require('nodemailer');

const MailService = {};

// Create a nodemailer transporter with your email service configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sanjucool1000@gmail.com', // Replace with your email
    pass: 'srvv1212', // Replace with your email password or an app-specific password
  },
});

MailService.sendEmail = (to, subject, message) => {
  // Send email logic here
  const mailOptions = {
    from: 'sanjucool1000@gmail.com', // Replace with your email
    to,
    subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = MailService;

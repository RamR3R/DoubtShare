const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Path to your db.js file
const User = require('./user.model'); 
const Tutor = require('./tutor.model');

const Doubt = sequelize.define('Doubt', {
  studentId: {
    type: DataTypes.INTEGER, // Assuming studentId is an integer
    allowNull: false,
    // Define foreign key constraint if necessary
    references: {
      model: 'User', // Name of the referenced model (User in this case)
      key: 'id', // Name of the referenced key (id in the User model)
    },
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assignedTutorId: {
    type: DataTypes.INTEGER, // Assuming assignedTutorId is an integer
    // Define foreign key constraint if necessary
    references: {
      model: 'Tutor', // Name of the referenced model (Tutor in this case)
      key: 'id', // Name of the referenced key (id in the Tutor model)
    },
  },
}, { timestamps: true });

Doubt.belongsTo(User, { through: 'studentId' });
Doubt.belongsTo(Tutor, { through: 'assignedTutorId'});

module.exports = Doubt;

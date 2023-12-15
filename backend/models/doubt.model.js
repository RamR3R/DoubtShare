const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 
const User = require('./user.model'); 
const Tutor = require('./tutor.model');

const Doubt = sequelize.define('Doubt', {
  studentId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    // references: {
    //   model: 'User', 
    //   key: 'id', 
    // },
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
    type: DataTypes.INTEGER, 
    // references: {
    //   model: 'Tutor', 
    //   key: 'id', 
    // },
  },
}, { timestamps: true });

// User.hasMany(Doubt , { foreignKey: 'studentId' });
// Tutor.hasMany(Doubt , { foreignKey: 'assignedTutorId'});
// Doubt.belongsTo(User, { foreignKey: 'studentId' });
// Doubt.belongsTo(Tutor, { foreignKey: 'assignedTutorId'});

module.exports = Doubt;

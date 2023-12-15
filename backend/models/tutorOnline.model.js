const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const TutorOnline = sequelize.define('TutorOnline', {
  tutorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  lastPingTime: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
});

module.exports = TutorOnline;

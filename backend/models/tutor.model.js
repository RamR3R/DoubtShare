const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Path to your db.js file
const Doubt = require('./doubt.model');

const Tutor = sequelize.define('Tutor', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  classGrade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull : false,
  },
  availability: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  rating: {
    type: DataTypes.FLOAT, // Use FLOAT or DECIMAL for decimal values
    defaultValue: 0,
  },
});

Tutor.hasMany(Doubt, { foreignKey: 'assignedTutorId', as:'AssignedDoubt'});


module.exports = Tutor;

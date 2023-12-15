const { DataTypes ,Model} = require('sequelize');
const sequelize = require("../db");
const Doubt = require('./doubt.model');


const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('Student', 'Tutor'),
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
});

// User.hasMany(Doubt, { foreignKey: 'id' , as: 'Doubt' });

module.exports = User;

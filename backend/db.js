const { Sequelize } = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(process.env.db, process.env.user, process.env.password, {
  host: '127.0.0.1', // Change this to your PostgreSQL server
  dialect: 'mysql'
});

module.exports = sequelize;

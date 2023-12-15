const { Sequelize } = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize({
  host: 'localhost',
  username: 'root',
  password: 'Srvv@1212',
  database: 'doubtshare',
  dialect: 'mysql'
});

module.exports = sequelize;

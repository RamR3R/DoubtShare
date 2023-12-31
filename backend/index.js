const express = require('express');
const sequelize = require('./db');
const User = require('./models/user.model'); 
const Tutor = require('./models/tutor.model');
const TutorOnline = require('./models/tutorOnline.model');
const Doubt = require('./models/doubt.model');
const app = express()
require("dotenv").config();
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);


app.listen(process.env.PORT, async() => {
    try 
    {
        await sequelize.authenticate();
        console.log('Connection to PostgreSQL has been established successfully.');

        // Synchronize the model with the database
        await sequelize.sync({ alter: true ,models: [User,Tutor,TutorOnline,Doubt]}); // Use alter: true to avoid dropping existing data

        console.log('All models were synchronized successfully.');
        console.log(`Server running at PORT : ${process.env.PORT}`);
    } 
    catch (error) 
    {
        console.error('Unable to connect to the database:', error.message);
    }
});
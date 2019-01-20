const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const examsAPI = require('./routes/exams');
const usersAPI = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

// MIDDLEWARE: What we initialize before we go to the route.
app.use(logger('dev')); // Here we only log in development mode.
app.use(express.json()); // We use this to parse through request bodies
app.use(express.static(path.join(__dirname, 'dist/AnswerSheetWebsite')));
  // BASE ROUTES: YOURS APIS
app.use('/api/exams', examsAPI);
app.use('/api/users', usersAPI);
app.use('/api/auth', auth);
app.use('*', express.static(path.join(__dirname, 'dist/AnswerSheetWebsite')));


// SERVER CONNECTION
mongoose
  .connect(
    "mongodb+srv://charlescarrier:"+ process.env.DB_PASS +"@cluster0-1kiiw.mongodb.net/answersheetwebsite?retryWrites=true",
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("connection to mongoDB successful"))
  .catch(() => console.log("connection to mongoDB failed"));

// LISTEN TO THE SERVER
app.listen('3000', () => {
  console.log("listening from port 3K");
});

//EXPORTING MAKES THE FILES SHARABLE ACROSS THE NODE.JS BACKEND APPLICATION
module.exports = app;

  
  


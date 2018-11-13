const express = require('express');
const path = require('path');
const logger = require('morgan');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const examsAPI = require('./routes/exams');
const usersAPI = require('./routes/users');
const auth = require('./routes/auth');


const app = express();

// MIDDLEWARE:
  // Middlewares are stuff that runs before 
  // anything else runs in the backend & backend happens after Middlewares

app.use(logger('dev')); // Here we only log in development mode.
app.use(express.json()); // We use this to parse through request bodies
app.use(express.static(path.join(__dirname, 'dist/AnswerSheetWebsite')));

app.use('/api/exams', examsAPI);
  // our first exception to the '/' path if we get '/api/reading' go to readingAPI
  // anytime we get a request to '/api/reading' we want to review the 
  // routing inside routes/reading.js
  // this happens because readingAPI points to './routes/reading'

app.use('/api/users', usersAPI);
app.use('/api/auth', auth);


app.use('*', express.static(path.join(__dirname, 'dist/AnswerSheetWebsite')));
  // This sets that an empty URL will go to within dist/AnswerSheetWebsite
  // this means anything / or anything undefined i.e. * goes here. 

mongoose
  .connect(
    "mongodb+srv://charlescarrier:" + process.env.DB_PASS + "@cluster0-1kiiw.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true",
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("connection to mongoDB successful"))
  .catch(() => console.log("connection to mongoDB failed"));
  // this is where we just mongoose to connect to the backend.

app.listen('3000', () => {
  console.log("listening from port 3K");
});
  // app.listen creates a server at '3000' so it is going HTTP.createServer on the backend

module.exports = app;
  // Here we are exporting the const app and making it sharable between components

  

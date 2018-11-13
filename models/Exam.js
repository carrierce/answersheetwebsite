const mongoose = require('mongoose');

const examSchema = mongoose.Schema({
  examType: String,
  name: String,
  sections: [
    {
      sectionType: String,
      // added a field called # of questions.
      // therefore for every section can enter the # of the questions.
      // When we submit from the front end the input is mostly a string, 
      // so keeping everything a string makes it simpler
      numberOfQuestions: String,
      questions: [
        {
          answer: String
        }
      ]
    }
  ]     
});


module.exports = mongoose.model('Exam', examSchema)


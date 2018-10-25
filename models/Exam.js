const mongoose = require('mongoose');

const examSchema = mongoose.Schema({
  examType: String,
  name: String,
  sections: [
    {
      sectionType: String,
      questions: [
        {
          answer: String
        }
      ]
    }
  ]     
});


module.exports = mongoose.model('Exam', examSchema)


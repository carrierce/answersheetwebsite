const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Exam = require('../models/Exam');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');


router.get('/', (req, res, next) => {
    Exam.find((err, testSectionData)=>{
      if (err) {
        return next(err);
      }     
      res.json(testSectionData);
    });
});

router.get('/:id', (req, res, next) => {
  Exam.findById(req.params.id,(err, selectTestSectionData) => {
    if (err) {
      return next(err);
    }    
    res.json(selectTestSectionData);
  });
});

router.post('/', auth, (req, res, next) => {
  Exam.create(req.body, (err, post)=>{
    if (err) {
      return next(err); 
    }
    
    res.json(post);
  });
});
  
router.put('/:id', auth, (req, res, next) => {
  Exam.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) {
      return next(err);
    } 
    
    res.json(post);
  });
});

router.delete('/:id', [auth, admin], (req, res, next) => {
  Exam.findByIdAndRemove(req.params.id, (err, post) => {
    if (err) {
      return next(err);
    }     
    res.json(post);
  });
});

module.exports = router;

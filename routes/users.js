

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

router.get('/', (req, res, next) => {
  User.find((err, userInformation)=>{
    if (err) {
      return next(err);
    }     
    res.json(userInformation);
  });
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, (err, singleUserInformation) => {
    if (err) {
      return next(err);
    }
    res.json(singleUserInformation);
  })
});

router.post('/', (req, res, next) => {
  User.create(req.body, (err, post)=>{
    if (err) {
      return next(err); 
    }    
    res.json(post);
  });
});

router.delete('/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id, (err, post) => {
    if (err) {
      return next(err);
    }     
    res.json(post);
  });
});

module.exports = router;
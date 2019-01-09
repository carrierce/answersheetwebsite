const _ = require("lodash");
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.get('/me', auth, async (req, res) => { 
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.get('/', (req, res, next) => {
  User.find((err, allUsersData)=>{
    if (err) {
      return next(err);
    }
    res.json(allUsersData);
  });
});

router.post('/', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  console.log(req.body);
  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  if(!user) {
    return res.status(400).send('No user found');
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.put('/:id', auth, (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) {
      return next(err);
    } 
    
    res.json(post);
  });
});
// this function does a put, whose route is the base route plus a concatenated :id (I THINK)
// we then have an auth, which simply checks if the user is logged in (I THINK I SHOULD ADD IN ADMIN AS WELL AS A BACKEND CHECK)
// then we have a call back with a 3 variables, req, res, next, the req is what is being passed in from
// the userapi.service.ts (I THINK) and is simply the specific user.
// then we do a User.findByIdAndUpdate (I presume we use User because since it is mongoose it has access that function)
// fbiau takes a range a of parameters that we pass it-- the id of where we update and the body of text to be updated
// then we have a call back. and the res of our outer called from router.put is assigned the content we post the backend.


module.exports = router;

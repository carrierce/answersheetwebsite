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

module.exports = router;

const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin, exp: expiry}, process.env.SECRET);
  return token;
}

module.exports = mongoose.model('User', userSchema);
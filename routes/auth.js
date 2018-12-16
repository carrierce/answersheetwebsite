const _ = require("lodash");
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');
    
    if(!process.env.SECRET) {
        console.error('FATAL ERROR: secret is undefined or not set.');
        process.exit(1);
    }

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, [
            '_id',
            'name',
            'email'
    ]));
});


module.exports = router;
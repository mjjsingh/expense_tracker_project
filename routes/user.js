// user.js

const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../db/db.js'); 
const verifyToken = require('./verifyToken');
const registerUser = require('./registerUser');
const loginUser = require('./loginUser');
const verifyPayment = require('./verifyPayment');

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'signup.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'login.html'));
});

router.post('/signup', registerUser);

router.post('/login', loginUser);

router.post('/verify-payment', verifyPayment);

module.exports = router;


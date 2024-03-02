// views.js

const path = require('path');
const express = require('express');
const router = express.Router();

router.use(express.static(path.join(__dirname, 'src')));

router.get('/expenses-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'expense.html'));
});

router.get('/razorpay-key', (req, res) => {
    res.json({ key: process.env.RAZORPAY_KEY_ID });
});

module.exports = router;

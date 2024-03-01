//user.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const db = require('../db/db.js'); 
const path = require('path');
const Razorpay = require('razorpay'); // Add this line


const secretKey = process.env.SECRET_KEY;

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'signup.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'login.html'));
});

router.post('/signup', async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.psw;
    if (!name || !email || !password) {
        console.log('Name, email, and password fields must not be empty.');
        return;
    }
    bcrypt.hash(password, 10, function(err, hash) {
        if (err) throw err;

        db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
            if (err) throw err;

            if (result.length > 0) {
                res.json({ message: 'Email already exists', status: 'error' });
            } else {
                db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash], (err, result) => {
                    if (err) throw err;
                    res.json({ message: 'User registered successfully', status: 'success' });
                });
            }
        });
    });
});

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.psw;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, function(err, isMatch) {
                if (err) {
                    throw err;
                } else if (!isMatch) {
                    console.log(`Password does not match for the user with email ${email}.`);
                    res.status(401).json({ status: 'error', message: 'User not authorized.' });
                } else {
                    console.log(`User with email ${email} authenticated successfully.`);
                    const token = jwt.sign({ userID: result[0].id }, secretKey);
                    res.cookie('token', token, { httpOnly: true }); // Set a cookie with the token
                    res.redirect('/expenses-page'); // Redirect to the expenses page
                }
            });
        } else {
            console.log(`No user found with the email ${email}.`);
            res.status(404).json({ status: 'error', message: 'User not found.' });
        }
    });
});


router.post('/verify-payment', async (req, res) => {
    const payment_id = req.body.payment_id;

    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    instance.payments.fetch(payment_id).then(payment => {
        if (payment.status === 'captured') {
            res.json({ status: 'success' });
        } else {
            res.json({ status: 'error' });
        }
    }).catch(err => {
        console.error(err);
        res.json({ status: 'error' });
    });
});


module.exports = router;

//user.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const db = require('../db/db.js'); 
const path = require('path');

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
                    res.json({ token });
                }
            });
        } else {
            console.log(`No user found with the email ${email}.`);
            res.status(404).json({ status: 'error', message: 'User not found.' });
        }
    });
});

module.exports = router;

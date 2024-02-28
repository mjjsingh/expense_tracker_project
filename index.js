//index.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db/db.js'); // Import the db module
const bcrypt = require('bcrypt'); // Import bcrypt

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static('src'));
app.use(express.urlencoded({ extended: true }));

app.get('/user/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'signup.html'));
});

app.get('/user/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'login.html'));
});

app.post('/user/signup', (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.psw;

    // Check if name, email, or password fields are empty
    if (!name || !email || !password) {
        console.log('Name, email, and password fields must not be empty.');
        return;
    }

    // Hash the password
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

app.post('/user/login', (req, res) => {
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
                    res.json({ status: 'success' }); // Send 'success' status
                }
            });
        } else {
            console.log(`No user found with the email ${email}.`);
            res.status(404).json({ status: 'error', message: 'User not found.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});








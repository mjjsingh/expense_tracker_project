//index.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db/db.js'); // Import the db module
const bcrypt = require('bcrypt'); // Import bcrypt
const session = require('express-session'); // Import express-session

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('src'));
app.use(express.urlencoded({ extended: true }));

// Use express-session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

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
                    req.session.user = result[0]; // Save user data in session
                    res.redirect('/expenses'); // Redirect to expenses page
                }
            });
        } else {
            console.log(`No user found with the email ${email}.`);
            res.status(404).json({ status: 'error', message: 'User not found.' });
        }
    });
});


// ... rest of your code

// Add a new route for expenses
app.get('/expenses', (req, res) => {
    if (req.session.user) { // Check if user is logged in
        res.sendFile(path.join(__dirname, 'src', 'expense.html'));
    } else {
        res.redirect('/user/login'); // Redirect to login page if not logged in
    }
});

// Add a new POST route for expenses
app.post('/expenses', (req, res) => {
    if (req.session.user) { // Check if user is logged in
        const { amount, description, category } = req.body;

        // Insert the expense data into the expenses table
        db.query('INSERT INTO expenses (user_id, amount, description, category) VALUES (?, ?, ?, ?)', [req.session.user.id, amount, description, category], (err, result) => {
            if (err) throw err;
            res.json({ message: 'Expense added successfully', status: 'success' });
        });
    } else {
        res.status(401).json({ status: 'error', message: 'User not authorized.' }); // Send an error status if the user is not logged in
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});










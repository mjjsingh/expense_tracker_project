//index.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db/db.js'); // Import the db module

const app = express();
const port = 3000;

app.use(express.static('src'));
app.use(bodyParser.urlencoded({ extended: true }));

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

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            res.json({ message: 'Email already exists', status: 'error' });
        } else {
            db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, result) => {
                if (err) throw err;
                res.json({ message: 'User registered successfully', status: 'success' });
            });
        }
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});







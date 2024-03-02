// registerUser.js

const bcrypt = require('bcrypt'); 
const db = require('../db/db.js'); 

async function registerUser(req, res) {
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
}

module.exports = registerUser;

// loginUser.js

const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const db = require('../db/db.js'); 
const secretKey = process.env.SECRET_KEY;

async function loginUser(req, res) {
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
}

module.exports = loginUser;

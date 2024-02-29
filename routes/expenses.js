//expenses.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db/db.js'); 

const secretKey = process.env.SECRET_KEY;

router.get('/', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            db.query('SELECT * FROM expenses WHERE user_id = ?', [req.user.userID], (err, expenses) => {
                if (err) throw err;
                res.json({ expenses });
            });
        });
    } else {
        res.sendStatus(401);
    }
});

router.post('/', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            const { amount, description, category } = req.body;
            db.query('INSERT INTO expenses (user_id, amount, description, category) VALUES (?, ?, ?, ?)', [req.user.userID, amount, description, category], (err, result) => {
                if (err) throw err;
                db.query('SELECT * FROM expenses WHERE user_id = ?', [req.user.userID], (err, expenses) => {
                    if (err) throw err;
                    res.json({ message: 'Expense added successfully', status: 'success', expenses });
                });
            });
        });
    } else {
        res.sendStatus(401);
    }
});

router.delete('/:id', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            const id = req.params.id;
            db.query('DELETE FROM expenses WHERE id = ? AND user_id = ?', [id, req.user.userID], (err, result) => {
                if (err) throw err;
                db.query('SELECT * FROM expenses WHERE user_id = ?', [req.user.userID], (err, expenses) => {
                    if (err) throw err;
                    res.json({ message: 'Expense deleted successfully', status: 'success', expenses });
                });
            });
        });
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;



// expenses.js

const express = require('express');
const router = express.Router();
const db = require('../db/db.js'); 
const verifyToken = require('./verifyToken');

router.get('/', async (req, res) => {
    if (!verifyToken(req, res)) return;
    db.query('SELECT * FROM expenses WHERE user_id = ?', [req.user.userID], (err, expenses) => {
        if (err) throw err;
        res.json({ expenses });
    });
});

router.post('/', async (req, res) => {
    if (!verifyToken(req, res)) return;
    const { amount, description, category } = req.body;
    db.query('INSERT INTO expenses (user_id, amount, description, category) VALUES (?, ?, ?, ?)', [req.user.userID, amount, description, category], (err, result) => {
        if (err) throw err;
        db.query('SELECT * FROM expenses WHERE user_id = ?', [req.user.userID], (err, expenses) => {
            if (err) throw err;
            res.json({ message: 'Expense added successfully', status: 'success', expenses });
        });
    });
});


router.delete('/:id', async (req, res) => {
    if (!verifyToken(req, res)) return;
    const id = req.params.id;
    db.query('DELETE FROM expenses WHERE id = ? AND user_id = ?', [id, req.user.userID], (err, result) => {
        if (err) throw err;
        db.query('SELECT * FROM expenses WHERE user_id = ?', [req.user.userID], (err, expenses) => {
            if (err) throw err;
            res.json({ message: 'Expense deleted successfully', status: 'success', expenses });
        });
    });
});

module.exports = router;




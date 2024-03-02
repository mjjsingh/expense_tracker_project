// routes/index.js

const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const expenseRoutes = require('./expenses');
const paymentRoutes = require('./payment');

router.use('/user', userRoutes);
router.use('/expenses', expenseRoutes);
router.use('/verify-payment', paymentRoutes);

module.exports = router;

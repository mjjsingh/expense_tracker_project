//index.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expenses');
const paymentRoutes = require('./routes/payment'); // Add this line

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/expenses', expenseRoutes);
app.use('/verify-payment', paymentRoutes); // Add this line

app.get('/expenses-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'expense.html'));
});

app.get('/razorpay-key', (req, res) => {
    res.json({ key: process.env.RAZORPAY_KEY_ID });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});













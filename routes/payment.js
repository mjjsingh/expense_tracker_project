// payment.js

const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const db = require('../db/db.js'); // Assuming you have a db.js file for database operations

router.post('/verify-payment', async (req, res) => {
    const paymentId = req.body.payment_id;
    const userId = req.body.user_id; // Get the user ID from the request body

    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    instance.payments.fetch(paymentId).then(async payment => {
        console.log('Payment fetched from Razorpay:', payment);
        if (payment.status === 'captured') {
            // If the payment is successful, update the user in the database
            db.query('UPDATE users SET isPremiumUser = true, paymentStatus = "successful" WHERE id = ?', [userId], (err, result) => {
                if (err) {
                    console.error('Error updating database:', err);
                    throw err;
                }
                console.log('Database update result:', result);
                res.json({ status: 'success' });
            });
        } else {
            // If the payment is not successful, update the user in the database
            db.query('UPDATE users SET isPremiumUser = false, paymentStatus = "failed" WHERE id = ?', [userId], (err, result) => {
                if (err) {
                    console.error('Error updating database:', err);
                    throw err;
                }
                console.log('Database update result:', result);
                res.json({ status: 'error' });
            });
        }
    }).catch(err => {
        console.error('Error fetching payment from Razorpay:', err);
        // If there is an error in fetching the payment, update the user in the database
        db.query('UPDATE users SET isPremiumUser = false, paymentStatus = "failed" WHERE id = ?', [userId], (err, result) => {
            if (err) {
                console.error('Error updating database:', err);
                throw err;
            }
            console.log('Database update result:', result);
            res.json({ status: 'error' });
        });
    });
});

module.exports = router;






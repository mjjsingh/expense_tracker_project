// verifyPayment.js

const Razorpay = require('razorpay');

async function verifyPayment(req, res) {
    const payment_id = req.body.payment_id;

    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    instance.payments.fetch(payment_id).then(payment => {
        if (payment.status === 'captured') {
            res.json({ status: 'success' });
        } else {
            res.json({ status: 'error' });
        }
    }).catch(err => {
        console.error(err);
        res.json({ status: 'error' });
    });
}

module.exports = verifyPayment;

// razorpay.js
document.getElementById('buyPremiumButton').onclick = function(e) {
    e.preventDefault(); // Prevent the default action

    // Fetch the Razorpay key ID from the server
    axios.get('/razorpay-key')
        .then(response => {
            // Use the key ID from the server to create the Razorpay options
            var options = {
                "key": response.data.key, // Use the key from the server
                "amount": "3000", // Amount is in paise, so 3000 paise = Rs 30
                "name": "Premium Membership",
                "description": "Buy premium membership",
                "handler": function (response){
                    // Call your server to verify the payment
                    axios.post('/verify-payment', {
                        payment_id: response.razorpay_payment_id
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => {
                        if (res.data.status === 'success') {
                            alert('Payment successful!');
                            // Here you can add any action you want to perform on successful payment
                        } else {
                            alert('Payment failed. Please try again.');
                        }
                    }).catch(error => {
                        console.error('Error:', error);
                        alert('An error occurred while verifying the payment. Please try again.');
                    });
                }
            };
            
            var rzp1 = new Razorpay(options);
            rzp1.open();
        }).catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching the Razorpay key. Please try again.');
        });
}




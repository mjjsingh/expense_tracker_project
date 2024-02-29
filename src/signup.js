//signup.js

async function submitForm(e) {
    e.preventDefault(); // Prevent form from being submitted

    // Manually create an object with the form data
    var formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        psw: document.getElementById('psw').value
    };

    try {
        // Use axios to send the form data to the server
        let response = await axios.post('/user/signup', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response); // Log the server's response

        let data = response.data;

        // Clear the form fields after successful submission
        if (data.status === 'success') {
            e.target.reset();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Attach the submitForm function to the form's submit event
document.getElementById('signupForm').addEventListener('submit', submitForm);







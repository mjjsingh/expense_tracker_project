//login.js
async function submitLoginForm(e) {
    e.preventDefault(); // Prevent form from being submitted

    // Manually create an object with the form data
    var formData = {
        email: document.getElementById('email').value,
        psw: document.getElementById('psw').value
    };

    try {
        // Use fetch to send the form data to the server
        let response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        let data = await response.json();

        // Display an error message
        var errorMessage = document.getElementById('errorMessage');
        if (data.status === 'error') {
            errorMessage.textContent = data.message;
        } else {
            alert('User login successful');
            e.target.reset();
            errorMessage.textContent = '';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Attach the submitLoginForm function to the form's submit event
document.getElementById('loginForm').addEventListener('submit', submitLoginForm);






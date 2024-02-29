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

        if (!response.ok) {
            if (response.status === 401) {
                alert('User not authorized');
            } else if (response.status === 404) {
                alert('User not found');
            }
            return;
        }

        // If the response is OK, get the token and store it
        let data = await response.json();
        localStorage.setItem('token', data.token);

        // Redirect to the expenses page
        window.location.href = '/expenses-page';
        e.target.reset();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Attach the submitLoginForm function to the form's submit event
document.getElementById('loginForm').addEventListener('submit', submitLoginForm);




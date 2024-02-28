//login.js
function submitLoginForm(e) {
    e.preventDefault(); // Prevent form from being submitted

    // Create a FormData object from the form
    var formData = new FormData(e.target);

    // Log the FormData object
    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }

    // Use fetch to send the form data to the server
    fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('User login successful');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Get the form element
var loginForm = document.getElementById('loginForm');

// Add an event listener to the form
loginForm.addEventListener('submit', submitLoginForm);






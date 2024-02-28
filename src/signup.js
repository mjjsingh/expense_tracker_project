//signup.js
function submitForm(e) {
    e.preventDefault(); // Prevent form from being submitted

    // Create a FormData object from the form
    var formData = new FormData(e.target);

    // Use fetch to send the form data to the server
    fetch('/user/signup', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Clear the form fields after successful submission
        e.target.reset();
    })
    .catch(error => console.error('Error:', error));
}

// Attach the submitForm function to the form's submit event
document.getElementById('signupForm').addEventListener('submit', submitForm);





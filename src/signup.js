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
        // Create a div to display the message
        var messageDiv = document.createElement('div');
        messageDiv.textContent = data.message;

        // Add a class to the div based on the status
        messageDiv.classList.add(data.status);

        // Append the div to the form
        e.target.appendChild(messageDiv);
    })
    .catch(error => console.error('Error:', error));
}

// Attach the submitForm function to the form's submit event
document.getElementById('signupForm').addEventListener('submit', submitForm);






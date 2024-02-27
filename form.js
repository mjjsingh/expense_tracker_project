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
        // Display the success message
        document.getElementById('message').textContent = data.message;
    })
    .catch(error => console.error('Error:', error));
}



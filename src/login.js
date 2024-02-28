//login.js
function submitLoginForm(e) {
    e.preventDefault(); // Prevent form from being submitted

    // Create a FormData object from the form
    var formData = new FormData(e.target);

    // Use fetch to send the form data to the server
    fetch('/user/login', {
        method: 'POST',
        body: formData
    })
    .catch(error => console.error('Error:', error));
}





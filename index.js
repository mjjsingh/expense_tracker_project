//index.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module

const app = express();
const port = 3000;

app.use(express.static('src'));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form at /user/signup
app.get('/user/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html')); // Replace 'signup.html' with the name of your HTML file
});

app.post('/user/signup', (req, res) => {
    // Process form data here
    // After processing, redirect back to the form
    res.redirect('/user/signup');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});




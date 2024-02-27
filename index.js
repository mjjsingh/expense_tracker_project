//index.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static('src'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/user/signup', (req, res) => {
    // Process form data here
    res.json({ message: 'Account created successfully!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



// server.js

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/expenses-page', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});


module.exports = app;

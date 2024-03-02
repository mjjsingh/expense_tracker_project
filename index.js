// index.js

require('dotenv').config();
const app = require('./server');
const routes = require('./routes');
const views = require('./views');
const port = 3000;

app.use('/', views);
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});













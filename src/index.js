// Express
const express = require('express');
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(require('./routes/index'));

app.listen(3000);
console.log('Server on port 3000');
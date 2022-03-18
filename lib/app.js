const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/dogs', require('./controllers/dogs'));
app.use('/api/v1/cats', require('./controllers/cats'));
app.use('/api/v1/movies', require('./controllers/movies'));
app.use('/api/v1/flowers', require('./controllers/flowers'));
app.use('/api/v1/sodas', require('./controllers/sodas'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

const express = require('express');
const genreRoutes = require('./routes/genreRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();

app.use(express.json());
app.use('/api', genreRoutes);
app.use('/api', movieRoutes);

module.exports = app;
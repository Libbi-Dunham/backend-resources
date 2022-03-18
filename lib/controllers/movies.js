const { Router } = require('express');
const Movie = require('../models/Movies');

module.exports = Router().post('/', async (req, res) => {
  const movie = await Movie.insert({
    title: req.body.title,
    director: req.body.director,
  });
  res.send(movie);
});

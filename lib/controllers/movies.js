const { Router } = require('express');
const Movie = require('../models/Movies');

module.exports = Router()
  .post('/', async (req, res) => {
    const movie = await Movie.insert({
      title: req.body.title,
      director: req.body.director,
    });
    res.send(movie);
  })

  .get('/:id', async (req, res) => {
    const movie = await Movie.getById(req.params.id);
    res.send(movie);
  })

  .get('/', async (req, res) => {
    const movies = await Movie.getAll();
    res.send(movies);
  })

  .patch('/:id', async (req, res) => {
    const movie = await Movie.updateById(req.params.id, req.body);
    res.send(movie);
  });

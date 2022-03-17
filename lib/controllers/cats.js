const { Router } = require('express');
const Cat = require('../models/Cats');

module.exports = Router()
  .post('/', async (req, res) => {
    const cat = await Cat.insert({
      name: req.body.name,
      favorite_treat: req.body.favorite_treat,
      favorite_toy: req.body.favorite_toy,
    });
    res.send(cat);
  })

  .get('/:id', async (req, res) => {
    const cat = await Cat.getById(req.params.id);
    res.send(cat);
  })

  .get('/', async (req, res) => {
    const cats = await Cat.getAll();
    res.send(cats);
  });

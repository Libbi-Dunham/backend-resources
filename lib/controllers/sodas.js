const { Router } = require('express');
const Soda = require('../models/Sodas');

module.exports = Router()
  .post('/', async (req, res) => {
    const soda = await Soda.insert({
      name: req.body.name,
      brand: req.body.brand,
    });
    res.send(soda);
  })

  .get('/:id', async (req, res) => {
    const soda = await Soda.getById(req.params.id);
    res.send(soda);
  })

  .get('/', async (req, res) => {
    const sodas = await Soda.getAll();
    res.send(sodas);
  });

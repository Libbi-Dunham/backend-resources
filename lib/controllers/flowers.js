const { Router } = require('express');
const Flower = require('../models/Flowers');

module.exports = Router()
  .post('/', async (req, res) => {
    const flower = await Flower.insert({
      name: req.body.name,
      color: req.body.color,
    });
    res.send(flower);
  })

  .get('/:id', async (req, res) => {
    const flower = await Flower.getById(req.params.id);
    res.send(flower);
  })

  .get('/', async (req, res) => {
    const flowers = await Flower.getAll();
    res.send(flowers);
  })

  .patch('/:id', async (req, res) => {
    const flower = await Flower.updateById(req.params.id, req.body);
    res.send(flower);
  });

const { Router } = require('express');
const Dog = require('../models/Dogs');

module.exports = Router()
  .post('/', async (req, res) => {
    const dog = await Dog.insert({
      name: req.body.name,
      quantity: req.body.quantity,
    });
    res.send(dog);
  })

  .get('/:id', async (req, res) => {
    const dog = await Dog.getById(req.params.id);
    res.send(dog);
  })

  .get('/', async (req, res) => {
    const dogs = await Dog.getAll();
    res.send(dogs);
  });

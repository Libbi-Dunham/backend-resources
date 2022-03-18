const { Router } = require('express');
const Flower = require('../models/Flowers');

module.exports = Router().post('/', async (req, res) => {
  const flower = await Flower.insert({
    name: req.body.name,
    color: req.body.color,
  });
  res.send(flower);
});

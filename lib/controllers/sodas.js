const { Router } = require('express');
const Soda = require('../models/Sodas');

module.exports = Router().post('/', async (req, res) => {
  const soda = await Soda.insert({
    name: req.body.name,
    brand: req.body.brand,
  });
  res.send(soda);
});

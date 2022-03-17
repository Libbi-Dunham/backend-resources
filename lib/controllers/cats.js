const { Router } = require('express');
const Cat = require('../models/Cats');

module.exports = Router().post('/', async (req, res) => {
  const cat = await Cat.insert({
    name: req.body.name,
    favorite_treat: req.body.favorite_treat,
    favorite_toy: req.body.favorite_toy,
  });
  res.send(cat);
});

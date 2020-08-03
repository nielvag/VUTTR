const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ msg: 'It works!' });
});

module.exports = routes;

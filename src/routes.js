const { Router } = require('express');

const routes = Router();

routes.get('/', async (req, res) => {
  res.json({ msg: 'ok!' });
});

module.exports = routes;

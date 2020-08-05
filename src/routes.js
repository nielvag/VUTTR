const { Router } = require('express');

const routes = Router();

const ToolsController = require('./app/controllers/ToolsController');

routes.post('/tools', ToolsController.store);

module.exports = routes;

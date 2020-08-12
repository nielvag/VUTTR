const { Router } = require('express');

const routes = Router();

const ToolsController = require('./app/controllers/ToolsController');

routes.post('/tools', ToolsController.store);

routes.get('/tools', ToolsController.index);

routes.delete('/tools/:id', ToolsController.remove);

module.exports = routes;

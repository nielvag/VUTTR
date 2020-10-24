const { Router } = require('express');

const routes = Router();

const ToolsController = require('./app/controllers/ToolsController');
const UsersController = require('./app/controllers/UsersController');
const SessionController = require('./app/controllers/SessionController');

routes.post('/tools', ToolsController.store);

routes.get('/tools', ToolsController.index);

routes.delete('/tools/:id', ToolsController.remove);

routes.post('/users', UsersController.store);

routes.post('/login', SessionController.store);

module.exports = routes;

const { Router } = require('express');

const routes = Router();

const ToolsController = require('./app/controllers/ToolsController');
const UsersController = require('./app/controllers/UsersController');
const SessionController = require('./app/controllers/SessionController');

const authMiddleware = require('./app/middlewares/authorization');

routes.get('/tools', ToolsController.index);

routes.post('/users', UsersController.store);

routes.post('/login', SessionController.store);


routes.use(authMiddleware);

routes.post('/tools', ToolsController.store);

routes.delete('/tools/:id', ToolsController.remove);

module.exports = routes;

const { Sequelize } = require('sequelize');

const dbConfig = require('../config/database');

const sequelize = new Sequelize(dbConfig);

/** All models have to be into models array */
const Tool = require('../app/models/Tool');
const Tag = require('../app/models/Tag');
const User = require('../app/models/User');
const ToolTag = require('../app/models/ToolTag');

const models = [Tool, Tag, User, ToolTag];

models.map((model) => model.init(sequelize));
models.map((model) => model.associate && model.associate(sequelize.models));

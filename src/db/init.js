const { Sequelize } = require('sequelize');

const dbConfig = require('../config/database');

const sequelize = new Sequelize(dbConfig);

/** All models have to be into models array */
const Tool = require('../app/models/Tool');

const models = [Tool];

models.map((model) => model.init(sequelize));

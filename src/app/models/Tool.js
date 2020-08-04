const { Sequelize, Model } = require('sequelize');

class Tool extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: Sequelize.STRING,
      link: Sequelize.STRING,
      description: Sequelize.STRING,
    }, {
      sequelize,
    });
  }
}

module.exports = Tool;

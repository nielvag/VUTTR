const { Sequelize, Model } = require('sequelize');

class Tool extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: Sequelize.STRING,
      link: Sequelize.STRING,
      description: Sequelize.STRING,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsToMany(models.Tag, { through: models.ToolTag, foreignKey: 'tool_id' });
    this.belongsTo(models.User, { foreignKey: 'own_id' });
  }
}

module.exports = Tool;

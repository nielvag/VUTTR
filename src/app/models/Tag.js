const { Sequelize, Model } = require('sequelize');

class Tag extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsToMany(models.Tool, { through: models.ToolTag, foreignKey: 'tag_id' });
  }
}

module.exports = Tag;

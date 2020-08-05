const { Sequelize, Model } = require('sequelize');

class ToolTag extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tool_id: {
        type: Sequelize.INTEGER,
        references: {
          model: sequelize.models.Tool,
          key: 'id',
        },
      },
      tag_id: {
        type: Sequelize.INTEGER,
        references: {
          model: sequelize.models.Tag,
          key: 'id',
        },
      },
    }, {
      sequelize,
      timestamps: false,
    });
  }
}

module.exports = ToolTag;

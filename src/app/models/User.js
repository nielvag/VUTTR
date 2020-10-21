const { Sequelize, Model } = require('sequelize');

class User extends Model {
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
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pass_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.hasMany(models.Tool, { foreignKey: 'own_id' });
  }
}

module.exports = User;

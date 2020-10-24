const { Sequelize, Model } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      pass_hash: Sequelize.STRING,
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if(user.password) {
        user.pass_hash = await bcrypt.hash(user.password, 8);
      }
    });
  }

  static associate(models) {
    this.hasMany(models.Tool, { foreignKey: 'own_id' });
  }
  
}

module.exports = User;

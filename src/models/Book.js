const { Model, DataTypes } = require('sequelize');

class Book extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
      },
      { sequelize: connection }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
  }
}

module.exports = Book;

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserToken.init({
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    createAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user_token',
    timestamps: false
  });
  return UserToken;
};
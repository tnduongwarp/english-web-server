'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserQuizResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserQuizResult.init({
    userId: DataTypes.INTEGER,
    quizId: DataTypes.STRING,
    dateCompleted: DataTypes.DATE,
    score: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_quiz_result',
    timestamps: false
  });
  return UserQuizResult;
};
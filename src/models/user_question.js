'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserQuestion.init({
    userId: DataTypes.INTEGER,
    quizId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    dateCompleted: DataTypes.DATE,
    userAnswer: DataTypes.STRING,
    isCorrect: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user_questions',
    timestamps: false
  });
  return UserQuestion;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Question.init({
    type: DataTypes.STRING,
    answer: DataTypes.STRING,
    content: DataTypes.TEXT,
    A: DataTypes.STRING,
    B: DataTypes.STRING,
    C: DataTypes.STRING,
    D: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Question',
    timestamps: false
  });
  return Question;
};
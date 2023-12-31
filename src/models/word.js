'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
  class Word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Word.init({
   pronunciation: DataTypes.STRING,
   original: DataTypes.STRING,
   meaning: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Word',
    timestamps: false
  });
  return Word;
};
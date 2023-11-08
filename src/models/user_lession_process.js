'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLessonProcess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserLessonProcess.init({
    userId: DataTypes.INTEGER,
    lessonId: DataTypes.INTEGER,
    completedDate: DataTypes.DATE,
    conpletedStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_lesson_process',
    timestamps: false
  });
  return UserLessonProcess;
};
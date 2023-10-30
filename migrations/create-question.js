'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      answer: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      A: {
        
        type: Sequelize.STRING
      },
      B: {
        type: Sequelize.STRING
      },
      C: {
        type: Sequelize.STRING
      },
      D: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Questions');
  }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subjectId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Subjects",
          key: "id",
        },
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      day:{
        type: Sequelize.ENUM,
        allowNull: false,
        values: ["senin", "selasa", "rabu", "kamis", "jumat"],
      },
      timeStart: {
        allowNull: false,
        type: Sequelize.TIME
      },
      timeEnd: {
        allowNull: false,
        type: Sequelize.TIME
      },
      building: {
        allowNull: false,
        type: Sequelize.STRING
      },
      room: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Schedules');
  }
};
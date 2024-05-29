"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Subjects", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      credit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      semester: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      lecturerNip: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Lecturers",
          key: "nip",
        },
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        defaultValue: "inactive",
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Subjects");
  },
};

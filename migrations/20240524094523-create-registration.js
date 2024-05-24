"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Registrations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      subjectId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Subjects",
          key: "id",
        },
      },
      studentNim: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Students",
          key: "nim",
        },
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      paymentProof: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("verify", "unverify"),
        defaultValue: "unverify",
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
    await queryInterface.dropTable("Registrations");
  },
};
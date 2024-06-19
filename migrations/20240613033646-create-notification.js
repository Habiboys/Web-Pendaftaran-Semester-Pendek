'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subjectId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Subjects",
          key: "id", 
        },
        onDelete: 'CASCADE'
      },
      studentNim: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Students",
          key: "nim",
        },
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.ENUM("read", "unread"),
        defaultValue: "unread",
        allowNull: false,
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
    await queryInterface.dropTable('Notifications');
  }
};
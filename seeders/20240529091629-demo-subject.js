"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Subjects",
      [
        {
          id: 'JSI001',
          name: "Subject 1",
          credit: 3,
          semester: 1,
          capacity: 10,
          lecturerNip: "123456789",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Subjects', null, {});
  
  },
};

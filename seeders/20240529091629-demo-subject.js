"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Subjects",
      [
        {
          id: 'JSI001',
          name: "PBO",
          credit: 3,
          semester: 3,
          capacity: 11,
          lecturerNip: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'JSI002',
          name: "PWEB",
          credit: 3,
          semester: 4,
          capacity: 20,
          lecturerNip: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'JSI003',
          name: "KWU",
          credit: 2,
          semester: 2,
          capacity: 20,
          lecturerNip: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'JSI004',
          name: "SDA",
          credit: 3,
          semester: 3,
          capacity: 20,
          lecturerNip: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'JSI005',
          name: "Kalkulus",
          credit: 2,
          semester: 2,
          capacity: 20,
          lecturerNip: "3",
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

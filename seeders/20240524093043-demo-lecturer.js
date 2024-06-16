'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Lecturers",
      [
        {
          nip: "1",
          name: "Dosen 1",
          birth: new Date("1990-01-01"),
          phone: "08123456789",
          gender: "Laki-laki",
          address: "Padang",
          userId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nip: "2",
          name: "Dosen 2",
          birth: new Date("1990-01-01"),
          phone: "08123456789",
          gender: "Laki-laki",
          address: "Padang",
          userId: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nip: "3",
          name: "Dosen 3",
          birth: new Date("1990-01-01"),
          phone: "08123456789",
          gender: "Laki-laki",
          address: "Padang",
          userId: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Lecturers', null, {});
  }
};

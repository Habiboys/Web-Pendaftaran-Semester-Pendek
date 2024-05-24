'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Lecturers",
      [
        {
          nip: "123456789",
          name: "Pak Dosen",
          birth: new Date("1990-01-01"),
          phone: "08123456789",
          gender: "Laki-laki",
          address: "Padang",
          userId: 3,
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

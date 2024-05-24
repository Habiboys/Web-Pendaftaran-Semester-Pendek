'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Students",
      [
        {
          nim: "2211521020",
          name: "Muhammad Nouval Habibie",
          birth: new Date("2004-02-18"),
          phone: "082392331371",
          gender: "Laki-laki",
          address: "Padang",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Students', null, {});
  }
};

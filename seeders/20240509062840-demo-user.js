const bcrypt = require("bcrypt");
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "2211521020_muhammad@student.unand.ac.id",
          password: await bcrypt.hash("2211521020", 10),
          role: "mahasiswa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "admin@gmail.com",
          password: await bcrypt.hash("admin123", 10),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "dosen@gmail.com",
          password: await bcrypt.hash("dosen123", 10),
          role: "dosen",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Students",
      [
        {
          nim: "2211521020",
          name: "Muhammad Nouval Habibie",
          date_of_birth: new Date("2004-02-18"),
          phone: "082392331371",
          gender: "Laki-laki",
          address: "Padang",
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Lecturers",
      [
        {
          nip: "123456789",
          name: "Pak Dosen",
          date_of_birth: new Date("1990-01-01"),
          phone: "08123456789",
          gender: "Laki-laki",
          address: "Padang",
          user_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );




  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete('Students', null, {});
    await queryInterface.bulkDelete('Lecturers', null, {});
  },
};

const bcrypt = require("bcrypt");
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          email: "2211521020_muhammad@student.unand.ac.id",
          password: await bcrypt.hash("asd", 10),
          role: "mahasiswa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          email: "mhs2@student.unand.ac.id",
          password: await bcrypt.hash("asd", 10),
          role: "mahasiswa",
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          id: 3,
          email: "mhs3@student.unand.ac.id",
          password: await bcrypt.hash("asd", 10),
          role: "mahasiswa",
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          id: 4,
          email: "mhs4@student.unand.ac.id",
          password: await bcrypt.hash("asd", 10),
          role: "mahasiswa",
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          id: 5,
          email: "mhs5@student.unand.ac.id",
          password: await bcrypt.hash("asd", 10),
          role: "mahasiswa",
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          id: 6,
          email: "mhs6@student.unand.ac.id",
          password: await bcrypt.hash("asd", 10),
          role: "mahasiswa",
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          id: 7,
          email: "mhs7@student.unand.ac.id",
          password: await bcrypt.hash("asd", 10),
          role: "mahasiswa",
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          id: 8,
          email: "mhs8@student.unand.ac.id",
          password: await bcrypt.hash("asd", 10),
          role: "mahasiswa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          id: 9,
          email: "mhs9@student.unand.ac.id",
          password: await bcrypt.hash("asd", 10),
          role: "mahasiswa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          id: 10,
          email: "mhs10@student.unand.ac.id",
          password: await bcrypt.hash("asd", 10),
          role: "mahasiswa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 11,
          email: "mhs11@student.unand.ac.id",
          password: await bcrypt.hash("asd", 10),
          role: "mahasiswa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 12,
          email: "admin@gmail.com",
          password: await bcrypt.hash("admin", 10),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 13,
          email: "dosen1@gmail.com",
          password: await bcrypt.hash("dosen1", 10),
          role: "dosen",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 14,
          email: "dosen2@gmail.com",
          password: await bcrypt.hash("dosen2", 10),
          role: "dosen",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 15,
          email: "dosen3@gmail.com",
          password: await bcrypt.hash("dosen3", 10),
          role: "dosen",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
         
        
      ],
      {}
    );

    

    




  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});

  },
};

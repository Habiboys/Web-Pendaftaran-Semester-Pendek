const bcrypt = require('bcrypt');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Users', [{
        email: '2211521020_muhammad@student.unand.ac.id',
        password: await bcrypt.hash('2211521020',10),
        role:'mahasiswa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
         email: 'admin@gmail.com',
         password: await bcrypt.hash('admin123', 10),
         role: 'admin',
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         email: 'dosen@gmail.com',
         password: await bcrypt.hash('dosen123', 10),
         role: 'dosen',
         createdAt: new Date(),
         updatedAt: new Date(),
       }
   
   
   ],{});
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};

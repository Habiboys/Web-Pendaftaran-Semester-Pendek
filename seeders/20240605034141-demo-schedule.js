'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Schedules",
      [
        {
          subjectId: 'JSI001',
          day: 'senin',
          timeStart: '07:30', // Waktu mulai dalam format tahun-bulan-tanggalTjam:menit:detik
          timeEnd: '10:30' , // Waktu berakhir dalam format tahun-bulan-tanggalTjam:menit:detik
          building: 'Gedung A',
          room: 'A101',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI002',
          day: 'rabu',
          timeStart: '07:30',
          timeEnd:'10:30' ,
          building: 'Gedung B',
          room: 'B201',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Schedules', null, {});
  }
};

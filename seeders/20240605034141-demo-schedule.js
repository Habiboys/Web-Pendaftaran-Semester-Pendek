'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Schedules",
      [
        {
          subjectId: 'JSI001',
          date: new Date('2023-06-05'), // Tanggal dalam format tahun-bulan-tanggal
          day: 'senin',
          timeStart: new Date('2023-06-05T08:00:00'), // Waktu mulai dalam format tahun-bulan-tanggalTjam:menit:detik
          timeEnd: new Date('2023-06-05T10:00:00'), // Waktu berakhir dalam format tahun-bulan-tanggalTjam:menit:detik
          building: 'Gedung A',
          room: 'A101',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI002',
          date: new Date('2023-06-07'),
          day: 'rabu',
          timeStart: new Date('2023-06-07T13:00:00'),
          timeEnd: new Date('2023-06-07T15:00:00'),
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
    await queryInterface.bulkDelete('Schedulers', null, {});
  }
};

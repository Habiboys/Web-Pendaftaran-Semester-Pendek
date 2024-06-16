'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Registrations",
      [
        {
          subjectId: 'JSI001',
          studentNim: '2211521020',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI001',
          studentNim: '2',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI001',
          studentNim: '3',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI001',
          studentNim: '4',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI001',
          studentNim: '5',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI001',
          studentNim: '6',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI001',
          studentNim: '7',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI001',
          studentNim: '8',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI001',
          studentNim: '9',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI001',
          studentNim: '10',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI001',
          studentNim: '11',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI002',
          studentNim: '2211521020',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI002',
          studentNim: '2',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI002',
          studentNim: '3',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI002',
          studentNim: '4',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI002',
          studentNim: '5',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI002',
          studentNim: '6',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI002',
          studentNim: '7',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI002',
          studentNim: '8',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI002',
          studentNim: '9',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI002',
          studentNim: '10',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI002',
          studentNim: '11',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI003',
          studentNim: '2211521020',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI003',
          studentNim: '2',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI003',
          studentNim: '3',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI004',
          studentNim: '4',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectId: 'JSI005',
          studentNim: '5',
          date: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date(),
        },


        
        
        
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Registration', null, {});
  }
};

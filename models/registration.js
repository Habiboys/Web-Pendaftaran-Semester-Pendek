'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
 
    static associate(models) {
      Registration.belongsTo(models.Subject, { foreignKey: 'subjectId'});
      Registration.belongsTo(models.Student, { foreignKey: 'studentNim'});
    }
  }
  Registration.init({
    subjectId: DataTypes.STRING,
    studentNim: DataTypes.STRING,
    date: DataTypes.DATE,
    paymentProof: DataTypes.STRING,
    status:{
      type: DataTypes.ENUM,
      values: ["verify", "unverify"],
    },
  }, {
    sequelize,
    modelName: 'Registration',
  });
  return Registration;
};
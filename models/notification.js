'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
   
    static associate(models) {
      Notification.belongsTo(models.Subject, { foreignKey: 'subjectId'});
      Notification.belongsTo(models.Student, {  foreignKey: 'studentNim'});
    }
  }
  Notification.init({
    title: DataTypes.STRING,
    message: DataTypes.STRING,
    studentNim: DataTypes.STRING,
    subjectId: DataTypes.STRING,
    status:{
      type: DataTypes.ENUM,
      values: ["read", "unread"],
    }
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};
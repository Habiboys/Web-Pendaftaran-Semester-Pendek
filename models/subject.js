'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {

    static associate(models) {
      Subject.belongsTo(models.Lecturer, { foreignKey: 'lecturerNip'});
      Subject.hasMany(models.Schedule, { onDelete: 'CASCADE', foreignKey: 'subjectId'});
      Subject.hasMany(models.Registration, {onDelete: 'CASCADE',   foreignKey: 'subjectId'});
      Subject.hasMany(models.Notification, {onDelete: 'CASCADE',   foreignKey: 'subjectId'});
      
    }
  }
  Subject.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    credit: DataTypes.INTEGER,
    semester: DataTypes.INTEGER,
    lecturerNip: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    status:{
      type: DataTypes.ENUM,
      values: ["active", "inactive"],
    },
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};
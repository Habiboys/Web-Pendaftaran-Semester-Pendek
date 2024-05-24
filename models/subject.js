'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {

    static associate(models) {
      Subject.belongsTo(models.Lecturer, { foreignKey: 'lecturerNip'});
      Subject.hasMany(models.Schedule, { foreignKey: 'subjectId'});
      Subject.hasMany(models.Registration, { foreignKey: 'subjectId'});
    }
  }
  Subject.init({
    name: DataTypes.STRING,
    credit: DataTypes.INTEGER,
    semester: DataTypes.INTEGER,
    lecturerNip: DataTypes.STRING,
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
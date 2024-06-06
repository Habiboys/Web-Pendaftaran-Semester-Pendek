'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Schedule.belongsTo(models.Subject, { foreignKey: 'subjectId'});
    }
  }
  Schedule.init({
    subjectId: DataTypes.STRING,
    date: DataTypes.DATE,
    day:{
      type: DataTypes.ENUM,
        values: ["senin", "selasa", "rabu", "kamis", "jumat"],
    },
    timeStart: DataTypes.TIME,
    timeEnd: DataTypes.TIME,
    building: DataTypes.STRING,
    room: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};
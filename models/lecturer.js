'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lecturer extends Model {
    
    static associate(models) {
      Lecturer.belongsTo(models.User, { foreignKey: 'userId'});
      Lecturer.hasMany(models.Subject, { foreignKey: 'lecturerNip' });
    }
  }
  Lecturer.init({
    nip: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    birth: DataTypes.DATE,
    phone: DataTypes.STRING,
    gender:{
      type: DataTypes.ENUM,
      values: ["laki-laki", "perempuan"],
    },
    address: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'Lecturer',
  });
  return Lecturer;
};
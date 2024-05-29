'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsTo(models.User, { foreignKey: 'userId'});
      Student.hasMany(models.Registration, { foreignKey: 'studentNim'});
    }
  }
  Student.init({
    nim:{
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
    modelName: 'Student',
  });
  return Student;
};
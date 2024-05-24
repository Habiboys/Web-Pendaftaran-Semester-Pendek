"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Lecturer, { foreignKey: "userId" });
      User.hasOne(models.Student, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM,
        values: ["mahasiswa", "dosen", "admin"],
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

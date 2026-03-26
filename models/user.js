"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: false,
            msg: "username cannot be empty",
          },
          notEmpty: {
            args: true,
            msg: "username cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "email already taken",
        },
        validate: {
          notNull: {
            args: false,
            msg: "email cannot be empty",
          },
          notEmpty: {
            args: true,
            msg: "email cannot be empty",
          },
          isEmail: {
            args: true,
            msg: "email format is incorrect",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          // notNull: {
          //   args: true,
          //   msg: "password cannot be empty",
          // },
          notEmpty: {
            args: true,
            msg: "password cannot be empty",
          },
          len: {
            args: [5],
            msg: "password must be at least 5 characters",
          },
        },
      },
      avatar_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};

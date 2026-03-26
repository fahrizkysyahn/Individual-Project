"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User);

      Transaction.belongsTo(models.Category);
    }
  }
  Transaction.init(
    {
      UserId: { type: DataTypes.INTEGER, allowNull: false },
      CategoryId: { type: DataTypes.INTEGER, allowNull: false },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: false,
            msg: "amount cannot be empty",
          },
          notEmpty: {
            args: true,
            msg: "amount cannot be empty",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: false,
            msg: "description cannot be empty",
          },
          notEmpty: {
            args: true,
            msg: "description cannot be empty",
          },
        },
      },
      transaction_date: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: false,
            msg: "date cannot be empty",
          },
          notEmpty: {
            args: true,
            msg: "date cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    },
  );
  return Transaction;
};

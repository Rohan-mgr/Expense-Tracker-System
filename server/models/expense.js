"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expense.belongsTo(models.User, {
        as: "UserExpenseRelation",
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // Expense.hasMany(models.Category, {
      //   as: "CategoryExpenseRelation",
      //   foreignKey: "categoryId",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });

      // Expense.hasMany(models.ExpenseTag, {
      //   as: "ExpenseExpenseTagRelation",
      //   foreignKey: "expenseId",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
    }
  }
  Expense.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      note: DataTypes.STRING,
      image: DataTypes.STRING,
      // categoryId: { type: DataTypes.INTEGER, allowNull: false },
      expenseDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      softDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      archived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Expense",
    }
  );
  return Expense;
};

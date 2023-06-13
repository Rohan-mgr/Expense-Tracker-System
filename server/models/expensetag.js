"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExpenseTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ExpenseTag.hasMany(models.Expense, {
      //   as: "ExpenseExpenseTagRelation",
      //   foreignKey: "expenseId",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });

      ExpenseTag.hasMany(models.Tag, {
        as: "TagExpenseTagRelation",
        foreignKey: "tagId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  ExpenseTag.init(
    {
      expenseId: { type: DataTypes.INTEGER, allowNull: false },
      tagId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "ExpenseTag",
    }
  );
  return ExpenseTag;
};

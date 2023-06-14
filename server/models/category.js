"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Category.belongsTo(models.User, {
      //   as: "UserCategoryRelation",
      //   foreignKey: "createdBy",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      // Category.belongsTo(models.Expense, {
      //   as: "CategoryExpenseRelation",
      //   foreignKey: "categoryId",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
    }
  }
  Category.init(
    {
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};

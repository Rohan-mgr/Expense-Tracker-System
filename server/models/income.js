"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Income.belongsTo(models.User, {
        as: "UserIncomeRelation",
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Income.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      note: DataTypes.STRING,
      incomeDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "income",
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
      modelName: "Income",
    }
  );
  return Income;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.belongsTo(models.User, {
        as: "UserTagRelation",
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Tag.hasMany(models.ExpenseTag, {
        as: "TagExpenseTagRelation",
        foreignKey: "tagId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Tag.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      tagTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: DataTypes.STRING,
      archived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Tag",
    }
  );
  return Tag;
};

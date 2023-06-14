"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Expenses", "type", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "expense",
    });
    await queryInterface.addColumn("Incomes", "type", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "income",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Expenses", "type");
    await queryInterface.removeColumn("Incomes", "type");
  },
};

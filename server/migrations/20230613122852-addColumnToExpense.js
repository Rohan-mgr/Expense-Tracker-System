"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.addColumn("Expenses", "type", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "expense",
    });
    // await queryInterface.addColumn("Expenses", "amount", {
    //   type: Sequelize.DOUBLE,
    //   allowNull: false,
    // });
    // await queryInterface.addColumn("Expenses", "expenseId", {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    // });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Expenses", "type");
    // await queryInterface.removeColumn("Expenses", "amount");
    // await queryInterface.removeColumn("Expenses", "expenseId");
  },
};

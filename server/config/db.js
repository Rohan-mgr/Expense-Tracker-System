const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense_tracker", "rohan", "rohan", {
  dialect: "postgres",
  host: "localhost",
});

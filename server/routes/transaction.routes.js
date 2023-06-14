const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");

router.post("/addexpense", transactionController.handleAddExpense);
router.post("/addincome", transactionController.handleAddIncome);
router.get("/expenses/:id", transactionController.handleFetchAllExpenses);
router.get("/incomes/:id", transactionController.handleFetchAllIncomes);
router.delete("/expenses/:id", transactionController.handleDeleteExpenses);
router.delete("/incomes/:id", transactionController.handleDeleteIncomes);

module.exports = router;

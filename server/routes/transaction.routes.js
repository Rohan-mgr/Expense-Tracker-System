const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");
const isAuth = require("../middleware/isAuth");

router.post("/addexpense", isAuth, transactionController.handleAddExpense);
router.post("/addincome", isAuth, transactionController.handleAddIncome);
router.get(
  "/expenses/:id",
  isAuth,
  transactionController.handleFetchAllExpenses
);
router.get("/incomes/:id", isAuth, transactionController.handleFetchAllIncomes);
router.delete(
  "/expenses/:id",
  isAuth,
  transactionController.handleDeleteExpenses
);
router.delete(
  "/incomes/:id",
  isAuth,
  transactionController.handleDeleteIncomes
);

module.exports = router;

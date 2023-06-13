const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");

router.post("/addexpense", transactionController.handleAddExpense);
router.get("/expenses", transactionController.handleFetchAllExpenses);

module.exports = router;

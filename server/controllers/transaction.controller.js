const { Expense } = require("../models");

exports.handleFetchAllExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();
    if (!expenses) {
      const error = new Error("Failed to fetch the expenses list");
      error.statusCode = 500;
      throw error;
    }
    res.status(200).json({
      message: "Expenses fetched successfully",
      expensesList: expenses,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.handleAddExpense = async (req, res, next) => {
  const {
    expenseTitle,
    expenseAmount,
    expenseDate,
    expenseCategory,
    expenseNote,
    id,
  } = req.body;
  try {
    const expense = await Expense.create({
      title: expenseTitle,
      userId: id,
      note: expenseNote,
      expenseDate: expenseDate,
      categoryName: expenseCategory,
      amount: expenseAmount,
    });

    if (!expense) {
      const error = new Error("Failed to add expense");
      error.statusCode = 500;
      throw error;
    }
    res
      .status(200)
      .json({ message: "Expense Added Successfully", newExpense: expense });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

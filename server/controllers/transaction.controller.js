const { Expense, Income } = require("../models");

exports.handleDeleteExpenses = async (req, res, next) => {
  const expenseId = req.params.id;
  try {
    const expense = await Expense.findByPk(expenseId);
    if (!expense) {
      const error = new Error("Expense List does not exists");
      error.statusCode = 404;
      throw error;
    }
    const deleteExpense = await expense.destroy();

    if (deleteExpense === 0) {
      const error = new Error("Failed to delete Expense List");
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json({
      message: "Expense List deleted successfully",
      deletedExpense: expense,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
exports.handleDeleteIncomes = async (req, res, next) => {
  const incomeId = req.params.id;
  try {
    const income = await Income.findByPk(incomeId);
    if (!income) {
      const error = new Error("Income List does not exists");
      error.statusCode = 404;
      throw error;
    }
    const deleteIncome = await income.destroy();

    if (deleteIncome === 0) {
      const error = new Error("Failed to delete Income List");
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json({
      message: "Income List deleted successfully",
      deletedIncome: income,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.handleFetchAllExpenses = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const expenses = await Expense.findAll({ where: { userId: userId } });
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

exports.handleFetchAllIncomes = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const incomes = await Income.findAll({ where: { userId: userId } });
    if (!incomes) {
      const error = new Error("Failed to fetch the incomes list");
      error.statusCode = 500;
      throw error;
    }
    res.status(200).json({
      message: "Incomes fetched successfully",
      incomesList: incomes,
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
exports.handleAddIncome = async (req, res, next) => {
  const {
    incomeTitle,
    incomeAmount,
    incomeDate,
    incomeCategory,
    incomeNote,
    id,
  } = req.body;
  try {
    const income = await Income.create({
      title: incomeTitle,
      userId: id,
      note: incomeNote,
      incomeDate: incomeDate,
      categoryName: incomeCategory,
      amount: incomeAmount,
    });

    if (!income) {
      const error = new Error("Failed to add income");
      error.statusCode = 500;
      throw error;
    }
    res
      .status(200)
      .json({ message: "Income Added Successfully", newIncome: income });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

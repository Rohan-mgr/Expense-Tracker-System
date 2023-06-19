import { config } from "../config";

export const AUTH_ENDPOINT = {
  signUp: config.baseURL + "/user/signup",
  signIn: config.baseURL + "/user/signin",
  googleLogin: config.baseURL + "/auth/google",
};

export const TRANSACTION_ENDPOINT = {
  expense: config.baseURL + "/transaction/addexpense",
  income: config.baseURL + "/transaction/addincome",
  fetchExpenses: config.baseURL + "/transaction/expenses",
  fetchIncomes: config.baseURL + "/transaction/incomes",
  deleteExpense: config.baseURL + "/transaction/expenses",
  deleteIncome: config.baseURL + "/transaction/incomes",
};

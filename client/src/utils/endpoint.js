import { config } from "../config";

export const AUTH_ENDPOINT = {
  signUp: config.baseURL + "/user/signup",
  signIn: config.baseURL + "/user/signin",
};

export const TRANSACTION_ENDPOINT = {
  expense: config.baseURL + "/transaction/addexpense",
  fetchExpenses: config.baseURL + "/transaction/expenses",
};

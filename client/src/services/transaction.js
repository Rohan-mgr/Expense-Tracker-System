import { TRANSACTION_ENDPOINT } from "../utils/endpoint";
import { http } from "../utils/http";

export const handleAddExpenses = async (values, id) => {
  const URL = TRANSACTION_ENDPOINT.expense;
  const expenseInfo = { ...values, id };
  console.log(URL);
  const response = await http.post(URL, JSON.stringify(expenseInfo));
  return response;
};

export const handleAddIncomes = async (values, id) => {
  const URL = TRANSACTION_ENDPOINT.income;
  const incomeInfo = { ...values, id };
  console.log(URL);
  const response = await http.post(URL, JSON.stringify(incomeInfo));
  return response;
};

export const getALLExpenses = async (id) => {
  const URL = TRANSACTION_ENDPOINT.fetchExpenses + `/${id}`;
  const response = await http.get(URL);
  return response;
};
export const getALLIncomes = async (id) => {
  const URL = TRANSACTION_ENDPOINT.fetchIncomes + `/${id}`;
  const response = await http.get(URL);
  return response;
};

export const deleteExpense = async (id) => {
  const URL = TRANSACTION_ENDPOINT.deleteExpense + `/${id}`;
  console.log(URL);
  const response = await http.delete(URL);
  return response;
};
export const deleteIncomes = async (id) => {
  const URL = TRANSACTION_ENDPOINT.deleteIncome + `/${id}`;
  console.log(URL);
  const response = await http.delete(URL);
  return response;
};

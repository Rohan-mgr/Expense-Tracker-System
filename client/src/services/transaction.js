import { TRANSACTION_ENDPOINT } from "../utils/endpoint";
import { http } from "../utils/http";

export const handleAddExpenses = async (values, id) => {
  const URL = TRANSACTION_ENDPOINT.expense;
  const expenseInfo = { ...values, id };
  console.log(URL);
  const response = await http.post(URL, JSON.stringify(expenseInfo));
  return response;
};

export const getALLExpenses = async () => {
  const URL = TRANSACTION_ENDPOINT.fetchExpenses;
  console.log(URL);
  const response = await http.get(URL);
  return response;
};

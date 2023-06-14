import { useEffect, useState } from "react";
import { getALLExpenses } from "../services/transaction";

export default function useFetchAllExpenses(id) {
  const [isLoading, setIsLoading] = useState(false);
  const [expenses, setExpensesLists] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const response = await getALLExpenses(id);
        setExpensesLists(response?.expensesList.reverse());
      } catch (e) {
        throw new Error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  return { isLoading, expenses, setExpensesLists };
}

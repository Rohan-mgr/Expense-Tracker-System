import { useEffect, useState } from "react";
import { getALLExpenses } from "../services/transaction";

export default function useFetchAllExpenses() {
  const [isLoading, setIsLoading] = useState(false);
  const [expenses, setExpensesLists] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const response = await getALLExpenses();
        setExpensesLists(response?.expensesList);
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

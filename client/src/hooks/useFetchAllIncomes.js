import { useEffect, useState } from "react";
import { getALLIncomes } from "../services/transaction";

export default function useFetchAllIncomes(id) {
  const [isLoading, setIsLoading] = useState(false);
  const [incomes, setIncomesLists] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const response = await getALLIncomes(id);
        setIncomesLists(response?.incomesList.reverse());
      } catch (e) {
        throw new Error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  return { isLoading, incomes, setIncomesLists };
}

import useFetchAllExpenses from "../hooks/useFetchAllExpenses";
import useFetchAllIncomes from "../hooks/useFetchAllIncomes";

export default function Misc(id) {
  const { expenses } = useFetchAllExpenses(id);
  const { incomes } = useFetchAllIncomes(id);

  const expenseAmounts = expenses.map((e) => e?.amount);
  const totalExpense = expenseAmounts.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const incomeAmounts = incomes.map((e) => e?.amount);
  const totalIncome = incomeAmounts.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const sortedExpenses = expenses.map((e) => e?.amount).sort((a, b) => a - b);
  const highestExpense = sortedExpenses[sortedExpenses.length - 1];
  const lowestExpense = sortedExpenses[0];

  const sortedIncome = incomes.map((e) => e?.amount).sort((a, b) => a - b);
  const highestIncome = sortedIncome[sortedIncome.length - 1];
  const lowestIncome = sortedIncome[0];

  const mergedTransactions = [...incomes, ...expenses];
  const recentTransactions = mergedTransactions.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return {
    totalExpense,
    totalIncome,
    highestIncome,
    lowestIncome,
    highestExpense,
    lowestExpense,
    recentTransactions,
    expenses,
    incomes,
  };
}

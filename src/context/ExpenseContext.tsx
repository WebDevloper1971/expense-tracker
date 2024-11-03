import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Expense } from "../types/ProjectTypes";

type ExpenseProviderProps = {
  children: ReactNode;
};

type ExpenseContextType = {
  expenseList: Expense[];
  addExpenseToList: (exp: Expense) => void;
  removeExpenseFromList: (id: number) => void;
  deleteAllExpenses: () => void;
};

const ExpenseListContext = createContext({} as ExpenseContextType);

// eslint-disable-next-line react-refresh/only-export-components
export function useExpenseList() {
  return useContext(ExpenseListContext);
}

export function ExpenseProvider({ children }: ExpenseProviderProps) {
  const [expenseList, setExpenseList] = useLocalStorage<Expense[]>(
    "expense-list",
    []
  );

  function addExpenseToList(exp: Expense) {
    setExpenseList((prev) => [...prev, exp]);
  }

  function removeExpenseFromList(id: number) {
    const list: Expense[] = expenseList.filter((f) => f.id !== id);
    setExpenseList(list);
    alert("expense deleted");
  }

  function deleteAllExpenses() {
    setExpenseList([]);
  }

  return (
    <ExpenseListContext.Provider
      value={{
        expenseList,
        addExpenseToList,
        removeExpenseFromList,
        deleteAllExpenses,
      }}
    >
      {children}
    </ExpenseListContext.Provider>
  );
}

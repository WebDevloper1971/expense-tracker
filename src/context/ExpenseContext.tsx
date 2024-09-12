import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ExpenseProviderProps = {
  children: ReactNode;
};

type ExpenseContextType = {
  expenseList: Expense[];
  addExpenseToList: (exp: Expense) => void;
};

type Expense = {
  id: number;
  category: string;
  product: string;
  price: number;
  month: number;
  day: number;
  year: number;
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

  return (
    <ExpenseListContext.Provider
      value={{
        expenseList,
        addExpenseToList,
      }}
    >
      {children}
    </ExpenseListContext.Provider>
  );
}

import { createContext, useReducer } from "react";

// cartlistItems = [{ name: "Food", amount: 100, date: 03 / 02 / 2001 }];

export const ExpensesContext = createContext({
  catListItems: [],
  addCatListItem: ({ catName, amount, desc, date, id }) => {},
  updateCatListItem: (id) => {},
  removeCatListItem: (id) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      return [action.payload, ...state];
    }
    case "DELETE": {
      return state.filter((expense) => expense.id !== action.payload.id);
    }
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expenseState, dispatch] = useReducer(expenseReducer, []);

  function addCatListItem(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  const value = {
    catListItems: expenseState,
    addCatListItem,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

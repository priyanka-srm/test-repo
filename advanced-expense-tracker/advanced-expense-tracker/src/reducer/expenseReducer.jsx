const initialState = {
  expenses: [],
  deletedHistory: [],
};
function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE": {
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    }
    case "DELETE_EXPENSE": {
      const deletedExpense = state.expenses.find(
        (expense) => expense.id === action.payload, );
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload, ),
        deletedHistory: deletedExpense
          ? [...state.deletedHistory, deletedExpense]
          : state.deletedHistory,
      };
    }
    case "RESTORE_EXPENSE": {
      const restoredExpense = state.deletedHistory.find(
        (expense) => expense.id === action.payload, );
      return {
        ...state,
        expenses: restoredExpense
          ? [...state.expenses, restoredExpense]
          : state.expenses,
        deletedHistory: state.deletedHistory.filter(
          (expense) => expense.id !== action.payload, ),
      };
    }
    case "CLEAR_HISTORY": {
      return {
        ...state,
        deletedHistory: [],
      };
    }
    case "UPDATE_EXPENSE": {
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense,
        ),
      };
    }
    default:
      return state;
  }
}
export { initialState };
export default expenseReducer;

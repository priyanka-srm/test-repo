import { useReducer, useState } from "react";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import Summary from "./components/Summary";
import DeletedHistory from "./components/DeletedHistory";
import expenseReducer, { initialState } from "./reducer/expenseReducer";
import "./App.css";
function App() {
  const [state, dispatch] = useReducer(expenseReducer, initialState);
  const expenses = state.expenses;
  const deletedExpenses = state.deletedHistory;
  const [editExpense, setEditExpense] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  // ADD EXPENSE
  const addExpense = (expense) => {
    dispatch({
      type: "ADD_EXPENSE",
      payload: expense,
    });
  };
  // DELETE EXPENSE
  const deleteExpense = (id) => {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: id,
    });
  };
  // RESTORE EXPENSE
  const restoreExpense = (id) => {
    dispatch({
      type: "RESTORE_EXPENSE",
      payload: id,
    });
  };
  // CLEAR DELETE HISTORY
  const clearHistory = () => {
    dispatch({
      type: "CLEAR_HISTORY",
    });
  };
  // EDIT CLICK
  const handleEdit = (expense) => {
    setEditExpense(expense);
  };
  // UPDATE EXPENSE
  const updateExpense = (updatedExpense) => {
    dispatch({
      type: "UPDATE_EXPENSE",
      payload: updatedExpense,
    });
    setEditExpense(null);
  };
  // CANCEL EDIT
  const cancelEdit = () => {
    setEditExpense(null);
  };
  // SEARCH + FILTER
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || expense.category === filterCategory;
    return matchesSearch && matchesCategory;
  });
  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <AddExpense
        key={editExpense?.id || "new"}
        addExpense={addExpense}
        editExpense={editExpense}
        updateExpense={updateExpense}
        cancelEdit={cancelEdit} />
      <Summary expenses={expenses} />
      <SearchBar search={search} setSearch={setSearch} />
      <Filter
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        expenses={expenses} />
      <ExpenseList
        expenses={filteredExpenses}
        deleteExpense={deleteExpense}
        handleEdit={handleEdit} />
      <DeletedHistory
        history={deletedExpenses}
        restoreExpense={restoreExpense}
        clearHistory={clearHistory} />
    </div>
  );
}
export default App;

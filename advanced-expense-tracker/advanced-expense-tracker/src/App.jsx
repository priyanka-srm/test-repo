import { useState } from "react";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import Summary from "./components/Summary";
import DeletedHistory from "./components/DeletedHistory";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";
function App() {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [deletedExpenses, setDeletedExpenses] = useLocalStorage(
    "deletedExpenses",
    [],
  );
  const [editExpense, setEditExpense] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  // ADD EXPENSE
  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };
  // DELETE EXPENSE
  const deleteExpense = (id) => {
    const deletedItem = expenses.find((expense) => expense.id === id);
    if (deletedItem) {
      setDeletedExpenses([...deletedExpenses, deletedItem]);
    }
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };
  // RESTORE EXPENSE
  const restoreExpense = (id) => {
    const restoreItem = deletedExpenses.find((expense) => expense.id === id);
    if (restoreItem) {
      setExpenses([...expenses, restoreItem]);
    }
    setDeletedExpenses(deletedExpenses.filter((expense) => expense.id !== id));
  };
  // EDIT CLICK
  const handleEdit = (expense) => {
    setEditExpense(expense);
  };
  // UPDATE EXPENSE
  const updateExpense = (updatedExpense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense,
      ),
    );
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
        restoreExpense={restoreExpense} />
    </div>
  );
}
export default App;

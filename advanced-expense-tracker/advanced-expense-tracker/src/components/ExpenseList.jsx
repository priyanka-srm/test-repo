import ExpenseItem from "./ExpenseItem";
function ExpenseList({ expenses, deleteExpense, setEditExpense }) {
  if (expenses.length === 0) {
    return (
      <div>
        <h3>No Expenses Available</h3>
      </div>
    );
  }
  return (
    <div>
      <h2>Expense List</h2>
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          deleteExpense={deleteExpense}
          setEditExpense={setEditExpense} />
      ))}
    </div>
  );
}
export default ExpenseList;

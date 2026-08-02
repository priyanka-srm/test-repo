import ExpenseItem from "./ExpenseItem";
function ExpenseList({ expenses, deleteExpense, handleEdit }) {
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
          handleEdit={handleEdit} />
      ))}
    </div>
  );
}
export default ExpenseList;

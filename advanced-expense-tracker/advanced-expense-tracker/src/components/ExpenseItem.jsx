function ExpenseItem({ expense, deleteExpense, setEditExpense }) {
  return (
    <div className="expense-item">
      <h3>{expense.description}</h3>
      <p>Amount: ₹{expense.amount}</p>
      <p>Category: {expense.category}</p>
      <p>Date: {expense.date}</p>
      <button onClick={() => setEditExpense(expense)}>✏️ Edit</button>
      <button onClick={() => deleteExpense(expense.id)}>🗑 Delete</button>
    </div>
  );
}
export default ExpenseItem;

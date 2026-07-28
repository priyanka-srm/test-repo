function DeletedHistory({ history, restoreExpense, clearHistory }) {
  if (history.length === 0) {
    return (
      <div>
        <h2>Deleted History</h2>
        <p>No Deleted Expenses</p>
      </div>
    );
  }
  return (
    <div className="deleted-history">
      <h2>Deleted History</h2>
      {history.map((expense) => (
        <div key={expense.id} className="deleted-item">
          <h3>{expense.description}</h3>
          <p>Amount: ₹{expense.amount}</p>
          <p>Category: {expense.category}</p>
          <p>Date: {expense.date}</p>
          <button onClick={() => restoreExpense(expense.id)}>Restore</button>
        </div>
      ))}
      <button onClick={clearHistory}>Clear History</button>
    </div>
  );
}
export default DeletedHistory;

function Summary({ expenses }) {
  const totalAmount = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );
  const totalExpenses = expenses.length;
  const categoryTotal = expenses.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += Number(expense.amount);
    } else {
      acc[expense.category] = Number(expense.amount);
    }
    return acc;
  }, {});
  return (
    <div className="summary">
      <h2>Expense Summary</h2>
      <p>Total Expenses: {totalExpenses}</p>
      <p>Total Amount: ₹{totalAmount}</p>
      <h3>Category Wise</h3>
      {Object.keys(categoryTotal).map((category) => (
        <p key={category}>
          {category} : ₹{categoryTotal[category]}
        </p>
      ))}
    </div>
  );
}
export default Summary;

function ExpenseSummary({ expenses }) {
  const totalExpense = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0,
  );
  const categoryTotal = (category) => {
    return expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
  };
  return (
    <div>
      <h2>Summary</h2>
      <p>Total Expense: £{totalExpense}</p>
      <p>Food: £{categoryTotal("Food")}</p>
      <p>Travel: £{categoryTotal("Travel")}</p>
      <p>Shopping: £{categoryTotal("Shopping")}</p>
      <p>Bills: £{categoryTotal("Bills")}</p>
      <p>Others: £{categoryTotal("Others")}</p>
    </div>
  );
}
export default ExpenseSummary;

import { useState } from "react";
function AddExpense({ addExpense, editExpense, updateExpense, cancelEdit }) {
  const [description, setDescription] = useState(
    editExpense ? editExpense.description : "",);
  const [amount, setAmount] = useState(editExpense ? editExpense.amount : "");
  const [category, setCategory] = useState(
    editExpense ? editExpense.category : "",);
  const [date, setDate] = useState(editExpense ? editExpense.date : "");
  const clearForm = () => {
    setDescription("");
    setAmount("");
    setCategory("");
    setDate("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      description.trim() === "" ||
      amount === "" ||
      category.trim() === "" ||
      date === ""
    ) {
      alert("Please fill all fields");
      return;
    }
    const expenseData = {
      id: editExpense ? editExpense.id : crypto.randomUUID(),
      description,
      amount,
      category,
      date,
    };
    if (editExpense) {
      updateExpense(expenseData);
    } else {
      addExpense(expenseData);
    }
    clearForm();
  };
  const handleCancel = () => {
    clearForm();
    cancelEdit();
  };
  return (
    <div className="expense-form">
      <h2>{editExpense ? "Edit Expense" : "Add Expense"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)} />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)} />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)} />
        <button type="submit">
          {editExpense ? "Update Expense" : "Add Expense"}
        </button>
        {editExpense && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
export default AddExpense;

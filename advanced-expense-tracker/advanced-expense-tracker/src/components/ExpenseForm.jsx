import { useState } from "react";
function ExpenseForm({ addExpense }) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.description ||
      !formData.amount ||
      !formData.category ||
      !formData.date
    ) {
      alert("Please fill all fields");
      return;
    }
    addExpense({
      description: formData.description,
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date,
    });
    setFormData({
      description: "",
      amount: "",
      category: "",
      date: "",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="description"
        placeholder="Expense Description"
        value={formData.description}
        onChange={handleChange}/>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange} />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange} />
      <button type="submit">Add Expense</button>
    </form>
  );
}
export default ExpenseForm;

// Expense Array
let expenses = [];
// Closure for private delete history
function createHistoryManager() {
  let deletedHistory = [];
  return {
    add(item) {
      deletedHistory.push(item);
    },
    getHistory() {
      return deletedHistory;
    }
  };
}
const historyManager =
createHistoryManager();
// DOM Elements
const descriptionInput =
document.getElementById("description");
const amountInput =
document.getElementById("amount");
const categoryInput =
document.getElementById("category");
const addBtn =
document.getElementById("addBtn");
const expenseList =
document.getElementById("expenseList");
const filterCategory =
document.getElementById("filterCategory");
const emptyMessage =
document.getElementById("emptyMessage");
// Add Expense
addBtn.addEventListener("click", () => {
  const description =
  descriptionInput.value.trim();
  const amount =
  Number(amountInput.value);
  const category =
  categoryInput.value;
  if (!description || amount <= 0) {
    alert("Please enter valid details");
    return;
  }
  const expense = {
    id: Date.now(),
    description,
    amount,
    category
  };
  expenses.push(expense);
  descriptionInput.value = "";
  amountInput.value = "";
  renderExpenses();
  updateSummary();
});
// Render Expenses using map()
function renderExpenses() {
  const selectedCategory =
  filterCategory.value;
  const filteredExpenses =
  selectedCategory === "All"
  ? expenses
  : expenses.filter(expense =>
      expense.category === selectedCategory
    );
  expenseList.innerHTML =
  filteredExpenses.map(expense => {
    return `
      <tr>
        <td>${expense.description}</td>
        <td>₹${expense.amount}</td>
        <td>${expense.category}</td>
        <td>
          <button
            class="delete-btn"
            onclick="deleteExpense(${expense.id})">
            Delete
          </button>
        </td>
      </tr>
    `;
  }).join("");
  emptyMessage.style.display =
  filteredExpenses.length === 0
  ? "block"
  : "none";
  renderHistory();
}
// Delete Expense
function deleteExpense(id) {
  const deletedItem =
  expenses.find(expense =>
    expense.id === id
  );
  historyManager.add(deletedItem);
  expenses =
  expenses.filter(expense =>
    expense.id !== id
  );
  renderExpenses();
  updateSummary();
}
// Update Summary using reduce()
function updateSummary() {
  const total =
  expenses.reduce(
    (acc, expense) =>
      acc + expense.amount,
    0
  );
  document.getElementById(
    "totalExpense"
  ).textContent =
  `Total Expense: ₹${total}`;
  const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Others"
  ];
  categories.forEach(category => {
    const categoryTotal =
    expenses
      .filter(expense =>
        expense.category === category
      )
      .reduce(
        (acc, expense) =>
          acc + expense.amount,
        0
      );
    document.getElementById(
      `${category.toLowerCase()}Total`
    ).textContent =
    `${category}: ₹${categoryTotal}`;
  });
}
// Render Delete History
function renderHistory() {
  const historyList =
  document.getElementById("historyList");
  const history =
  historyManager.getHistory();
  historyList.innerHTML =
  history.map(item => {
    return `
      <li>
        ${item.description}
        - ₹${item.amount}
        (${item.category})
      </li>
    `;
  }).join("");
}
// Filter Event
filterCategory.addEventListener(
  "change",
  renderExpenses
);
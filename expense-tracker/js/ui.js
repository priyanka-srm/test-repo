// ===== Imports =====
import { formatCurrency, formatDate } from "./utils.js";
import { MESSAGES } from "./constants.js";
// ===== DOM Elements =====
const expenseList = document.getElementById("expenseList");
const emptyMessage = document.getElementById("emptyMessage");
const historyList = document.getElementById("historyList");
const emptyHistory = document.getElementById("emptyHistory");
const totalExpense = document.getElementById("totalExpense");
const foodTotal = document.getElementById("foodTotal");
const travelTotal = document.getElementById("travelTotal");
const shoppingTotal = document.getElementById("shoppingTotal");
const billsTotal = document.getElementById("billsTotal");
const othersTotal = document.getElementById("othersTotal");
// ===== Render Expenses =====
export function renderExpenses(expenses) {
  if (expenses.length === 0) {
    expenseList.innerHTML = "";
    emptyMessage.textContent = MESSAGES.EMPTY;
    emptyMessage.style.display = "block";
    return;
  }
  emptyMessage.style.display = "none";
  expenseList.innerHTML = expenses
    .map(
      (expense) => `
      <tr>
        <td>${expense.description}</td>
        <td>${formatCurrency(expense.amount)}</td>
        <td>${expense.category}</td>
        <td>${formatDate(expense.date)}</td>
        <td>
          <button
            class="delete-btn"
            data-id="${expense.id}">
            Delete
          </button>
        </td>
      </tr>
    `,
    )
    .join("");
}
// ===== Render Summary =====
export function renderSummary(expenses) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalExpense.textContent = `Total Expense : ${formatCurrency(total)}`;
  const categories = ["Food", "Travel", "Shopping", "Bills", "Others"];
  categories.forEach((category) => {
    const categoryTotal = expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById(`${category.toLowerCase()}Total`).textContent = `${category} : ${formatCurrency(categoryTotal)}`;
  });
}
// ===== Render Deleted History =====
export function renderHistory(history) {
  if (history.length === 0) {
    historyList.innerHTML = "";
    emptyHistory.style.display = "block";
    return;
  }
  emptyHistory.style.display = "none";
  historyList.innerHTML = history
    .map(
      (item) => `
      <li>
        ${item.description}
        -
        ${formatCurrency(item.amount)}
        (${item.category})
      </li>
    `,
    )
    .join("");
}
// ===== Clear Form =====
export function clearForm() {
  document.getElementById("expenseForm").reset();
}
// ===== Show Alert =====
export function showMessage(message) {
  alert(message);
}

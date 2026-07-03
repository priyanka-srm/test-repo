// ===== Imports =====
import { loadExpenses, loadHistory } from "./storage.js";
import { addExpense, deleteExpense, clearAllExpenses, initializeApp, filterExpenses} from "./handlers.js";
import { debounce } from "./utils.js";
// ===== DOM Elements =====
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const clearAllBtn = document.getElementById("clearAllBtn");
const searchExpense = document.getElementById("searchExpense");
const filterCategory = document.getElementById("filterCategory");
// ===== Initialize Application =====
initializeApp(loadExpenses(), loadHistory());
// ===== Add Expense =====
expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addExpense({
    description: document.getElementById("description").value,
    amount: document.getElementById("amount").value,
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
  });
});
// ===== Delete Expense (Event Delegation) =====
expenseList.addEventListener("click", (event) => {
  if (!event.target.classList.contains("delete-btn")) {
    return;
  }
  deleteExpense(event.target.dataset.id);
});
// ===== Clear All =====
clearAllBtn.addEventListener("click", () => {
  clearAllExpenses();
});
// ===== Search Expense =====
searchExpense.addEventListener(
  "input",
  debounce(() => {
    filterExpenses( searchExpense.value, filterCategory.value );
  },300)
);
// ===== Filter Expense =====
filterCategory.addEventListener("change", () => {
  filterExpenses( searchExpense.value, filterCategory.value);
});

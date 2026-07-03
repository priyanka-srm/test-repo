// ===== Imports =====
import { state, setExpenses, setDeletedHistory } from "./state.js";
import { saveExpenses, saveHistory, clearStorage } from "./storage.js";
import { renderExpenses, renderSummary, renderHistory, clearForm, showMessage,} from "./ui.js";
import { generateId, isValidAmount, isValidDescription } from "./utils.js";
import { VALIDATION, MESSAGES } from "./constants.js";
// ===== Add Expense =====
export function addExpense({ description, amount, category, date }) {
  if (
    !isValidDescription(description, VALIDATION.MAX_DESCRIPTION_LENGTH) ||
    !isValidAmount(amount, VALIDATION.MIN_AMOUNT)
  ) {
    showMessage(MESSAGES.INVALID_INPUT);
    return;
  }
  const expense = {
    id: generateId(),
    description: description.trim(),
    amount: Number(amount),
    category,
    date,
  };
  state.expenses.push(expense);
  saveExpenses(state.expenses);
  renderExpenses(state.expenses);
  renderSummary(state.expenses);
  clearForm();
  showMessage(MESSAGES.EXPENSE_ADDED);
}
// ===== Delete Expense =====
export function deleteExpense(id) {
  const deletedExpense = state.expenses.find(
    (expense) => expense.id === Number(id),
  );
  if (!deletedExpense) return;
  state.deletedHistory.push(deletedExpense);
  setExpenses(state.expenses.filter((expense) => expense.id !== Number(id)));
  saveExpenses(state.expenses);
  saveHistory(state.deletedHistory);
  renderExpenses(state.expenses);
  renderSummary(state.expenses);
  renderHistory(state.deletedHistory);
}
// ===== Clear All =====
export function clearAllExpenses() {
  const confirmed = confirm(MESSAGES.CLEAR_CONFIRM);
  if (!confirmed) return;
  setExpenses([]);
  setDeletedHistory([]);
  clearStorage();
  renderExpenses([]);
  renderSummary([]);
  renderHistory([]);
}
// ===== Load App =====
export function initializeApp(expenses, history) {
  setExpenses(expenses);
  setDeletedHistory(history);
  renderExpenses(state.expenses);
  renderSummary(state.expenses);
  renderHistory(state.deletedHistory);
}
// ===== Search & Filter =====
export function filterExpenses(searchText, category) {
  const search = searchText.trim().toLowerCase();
  const filteredExpenses = state.expenses.filter((expense) => {
    const matchesSearch = expense.description.toLowerCase().includes(search);
    const matchesCategory = category === "All" || expense.category === category;
    return matchesSearch && matchesCategory;
  });
  renderExpenses(filteredExpenses);
}

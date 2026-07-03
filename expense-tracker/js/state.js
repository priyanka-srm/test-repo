// ===== Default Application State =====
import { DEFAULT_STATE } from "./constants.js";
export const state = {
  ...DEFAULT_STATE,
};
// ===== State Update Functions =====
export function setExpenses(expenses) {
  state.expenses = expenses;
}
export function setDeletedHistory(history) {
  state.deletedHistory = history;
}
export function setSearchText(text) {
  state.searchText = text;
}
export function setSelectedCategory(category) {
  state.selectedCategory = category;
}
export function setEditingExpenseId(id) {
  state.editingExpenseId = id;
}
export function resetEditingExpense() {
  state.editingExpenseId = null;
}

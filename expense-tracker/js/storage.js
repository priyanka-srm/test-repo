// ===== Imports =====
import { STORAGE_KEYS } from "./constants.js";
// ===== Save Expenses =====
export function saveExpenses(expenses) {
  localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
}
// ===== Load Expenses =====
export function loadExpenses() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.EXPENSES)) || [];
  } catch {
    return [];
  }
}
// ===== Save Deleted History =====
export function saveHistory(history) {
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
}
// ===== Load Deleted History =====
export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY)) || [];
  } catch {
    return [];
  }
}
// ===== Clear Expenses =====
export function clearExpenses() {
  localStorage.removeItem(STORAGE_KEYS.EXPENSES);
}
// ===== Clear Deleted History =====
export function clearHistory() {
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
}
// ===== Clear All Application Data =====
export function clearStorage() {
  clearExpenses();
  clearHistory();
}

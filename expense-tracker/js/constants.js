// ===== Storage Keys =====
export const STORAGE_KEYS = {
  EXPENSES: "expenses",
  HISTORY: "deletedHistory"
};
// ===== Categories =====
export const CATEGORIES = [ "Food", "Travel", "Shopping", "Bills", "Others"];
// ===== Validation =====
export const VALIDATION = {
  MIN_AMOUNT: 1,
  MAX_DESCRIPTION_LENGTH: 50
};
// ===== Messages =====
export const MESSAGES = {
  EMPTY: "No expenses added.",
  EMPTY_HISTORY: "No deleted history.",
  INVALID_INPUT: "Please enter valid expense details."
};
// ===== Default state ======
export const DEFAULT_STATE = {
  expenses: [],
  deletedHistory: [],
  searchText: "",
  selectedCategory: "All",
  editingExpenseId: null,
};

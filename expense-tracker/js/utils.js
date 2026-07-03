// ===== Date Formatter =====
export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
// ===== Currency Formatter =====
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
}
// ===== Description Validation =====
export function isValidDescription(description, maxLength) {
  return ( description.trim().length > 0 && description.trim().length <= maxLength );
}
// ===== Amount Validation =====
export function isValidAmount(amount, minAmount) {
  return Number(amount) >= minAmount;
}
// ===== Generate Unique ID =====
export function generateId() {
  return Date.now();
}
// ===== Debounce =====
export function debounce(callback, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { callback(...args);
    }, delay);
  };
}

/* ==========================================
   UTILITY FUNCTIONS
========================================== */
/* ---------- Capitalize First Letter ---------- */
export function capitalize(text) {
  if (!text) return "";
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
/* ---------- Format Date ---------- */
export function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
/* ---------- Format Time ---------- */
export function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
/* ---------- Debounce ---------- */
export function debounce(callback, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
/* ---------- Weather Icon ---------- */
export function getWeatherIcon(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
/* ---------- Country Flag ---------- */
export function getCountryFlag(countryCode) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
}
/* ---------- Visibility ---------- */
export function formatVisibility(value) {
  return `${(value / 1000).toFixed(1)} km`;
}
/* ---------- Wind ---------- */
export function formatWind(speed) {
  return `${speed} m/s`;
}

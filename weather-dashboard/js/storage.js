/* ==========================================
   LOCAL STORAGE FUNCTIONS
========================================== */
import { CONFIG } from "./config.js";
/* ---------- Theme ---------- */
export function saveTheme(theme) {
  localStorage.setItem("weatherTheme", theme);
}
export function loadTheme() {
  return localStorage.getItem("weatherTheme");
}
/* ---------- Recent Searches ---------- */
export function saveRecentSearch(city) {
  let searches = getRecentSearches();
  // Remove duplicate
  searches = searches.filter((item) => item !== city);
  // Add latest city to beginning
  searches.unshift(city);
  // Keep only latest searches
  searches = searches.slice(0, CONFIG.MAX_RECENT_SEARCHES);
  localStorage.setItem("recentCities", JSON.stringify(searches));
}
export function getRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem("recentCities")) || [];
  } catch {
    return [];
  }
}
export function clearRecentSearches() {
  localStorage.removeItem("recentCities");
}

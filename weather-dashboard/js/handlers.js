/* ==========================================
   HANDLERS
========================================== */
import { state } from "./state.js";
import { fetchWeather, fetchWeatherByCoords, getCurrentLocation,} from "./api.js";
import { saveTheme, loadTheme, saveRecentSearch, getRecentSearches, clearRecentSearches,} from "./storage.js";
import { showLoading, showError, showState, renderWeather, renderRecentSearches, updateThemeButton, updateDateTime,} from "./ui.js";
/* ==========================================
   DOM
========================================== */
const cityInput = document.getElementById("cityInput");
const searchForm = document.getElementById("searchForm");
const retryBtn = document.getElementById("retryBtn");
const themeToggle = document.getElementById("themeToggle");
const locationBtn = document.getElementById("locationBtn");
const clearHistory = document.getElementById("clearHistory");
/* ==========================================
   SEARCH
========================================== */
export async function handleSearch(city) {
  const searchCity = city || cityInput.value.trim();
  if (!searchCity) {
    showError("Please enter a city name.");
    return;
  }
  state.currentCity = searchCity;
  showLoading();
  try {
    const data = await fetchWeather(searchCity);
    if (!data) return;
    state.weatherData = data;
    renderWeather(data);
    saveRecentSearch(searchCity);
    loadRecentSearches();
  } catch (error) {
    showError(error.message);
  }
}
/* ==========================================
   CURRENT LOCATION
========================================== */
export async function handleLocation() {
  showLoading();
  try {
    const position = await getCurrentLocation();
    const {
      latitude,
      longitude,
    } = position.coords;
    const data = await fetchWeatherByCoords(latitude, longitude);
    state.weatherData = data;
    renderWeather(data);
  } catch (error) {
    showError(error.message);
  }
}
/* ==========================================
   RETRY
========================================== */
export function handleRetry() {
  if (state.currentCity) {
    handleSearch(state.currentCity);
  }
}
/* ==========================================
   THEME
========================================== */
export function handleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  saveTheme(isDark);
  updateThemeButton(isDark);
}
/* ==========================================
   LOAD THEME
========================================== */
export function initializeTheme() {
  if (loadTheme() === "true") {
    document.body.classList.add("dark");
  }
  updateThemeButton(document.body.classList.contains("dark"));
}
/* ==========================================
   RECENT SEARCHES
========================================== */
export function loadRecentSearches() {
  const searches = getRecentSearches();
  renderRecentSearches( searches, handleSearch,);
}
/* ==========================================
   CLEAR HISTORY
========================================== */
export function handleClearHistory() {
  clearRecentSearches();
  loadRecentSearches();
}
/* ==========================================
   EVENTS
========================================== */
export function attachEvents() {
  searchForm.addEventListener( "submit", (event) => { event.preventDefault(); handleSearch();},);
  retryBtn.addEventListener( "click", handleRetry, );
  themeToggle.addEventListener( "click", handleTheme, );
  locationBtn.addEventListener( "click", handleLocation,);
  clearHistory.addEventListener( "click", handleClearHistory,);
}
/* ==========================================
   INITIALIZE
========================================== */
export function initialize() {
  initializeTheme();
  attachEvents();
  loadRecentSearches();
  showState("empty");
  updateDateTime();
  setInterval(updateDateTime, 1000,);
}

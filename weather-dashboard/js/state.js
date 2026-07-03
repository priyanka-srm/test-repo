/* ==========================================
   APPLICATION STATE
========================================== */
export const state = {
  // Current searched city
  currentCity: "",
  // Weather API response
  weatherData: null,
  // AbortController
  controller: null,
  // Theme
  theme: "light",
  // Recent Searches
  recentSearches: [],
  // Suggestions
  suggestions: [],
  // Current Loading State
  loading: false,
  // Error Message
  error: null
};
/* ==========================================
   UI FUNCTIONS
========================================== */
import { formatTime, capitalize, getCountryFlag, formatVisibility, formatWind, getWeatherIcon,} from "./utils.js";
/* ==========================================
   DOM ELEMENTS
========================================== */
const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const emptyState = document.getElementById("emptyState");
const weatherContainer = document.getElementById("weatherContainer");
const errorMessage = document.getElementById("errorMessage");
const retryBtn = document.getElementById("retryBtn");
const recentSearches = document.getElementById("recentSearches");
/* ==========================================
   SHOW STATE
========================================== */
export function showState(state) {
  loadingState.classList.add("hidden");
  errorState.classList.add("hidden");
  emptyState.classList.add("hidden");
  weatherContainer.classList.add("hidden");
  retryBtn.classList.add("hidden");
  switch (state) {
    case "loading":
      loadingState.classList.remove("hidden");
      break;
    case "weather":
      weatherContainer.classList.remove("hidden");
      break;
    case "error":
      errorState.classList.remove("hidden");
      retryBtn.classList.remove("hidden");
      break;
    default:
      emptyState.classList.remove("hidden");
  }
}
/* ==========================================
   LOADING
========================================== */

export function showLoading() {
  showState("loading");
}
/* ==========================================
   ERROR
========================================== */
export function showError(message) {
  errorMessage.textContent = message;
  showState("error");
}
/* ==========================================
   WEATHER
========================================== */
export function renderWeather(data) {
  showState("weather");
  document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`
  document.getElementById("countryName").textContent = data.sys.country;
  document.getElementById("countryFlag").textContent = getCountryFlag( data.sys.country,);
  document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById("temperatureCard").textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById("feelsLike").textContent = `Feels Like ${Math.round(data.main.feels_like)}°C`;
  document.getElementById("weatherDescription").textContent = capitalize( data.weather[0].description,);
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("windSpeed").textContent = formatWind( data.wind.speed, );
  document.getElementById("pressure").textContent = `${data.main.pressure} hPa`;
  document.getElementById("visibility").textContent = formatVisibility( data.visibility,);
  document.getElementById("cloudiness").textContent = `${data.clouds.all}%`;
  document.getElementById("tempMin").textContent = `${Math.round(data.main.temp_min)}°C`;
  document.getElementById("tempMax").textContent = `${Math.round(data.main.temp_max)}°C`;
  document.getElementById("coordinates").textContent = `${data.coord.lat}, ${data.coord.lon}`;
  document.getElementById("sunrise").textContent = formatTime( data.sys.sunrise * 1000,);
  document.getElementById("sunset").textContent = formatTime( data.sys.sunset * 1000,);
  document.getElementById("lastUpdated").textContent = `Updated : ${formatTime(Date.now())}`;
  document.getElementById("weatherIcon").src = getWeatherIcon( data.weather[0].icon, );
}
/* ==========================================
   RECENT SEARCHES
========================================== */
export function renderRecentSearches(cities, callback) {
  recentSearches.innerHTML = "";
  if (cities.length === 0) {
    recentSearches.innerHTML = `<div class="empty-recent"> No Recent Searches </div>`;
    return;
  }
  cities.forEach((city) => {
    const button = document.createElement("button");
    button.className = "search-chip";
    button.textContent = city;
    button.addEventListener("click", () => callback(city));
    recentSearches.appendChild(button);
  });
}
/* ==========================================
   THEME BUTTON
========================================== */
export function updateThemeButton(isDark) {
  const button = document.getElementById("themeToggle");
  button.textContent = isDark ? "☀ Light Mode" : "🌙 Dark Mode";
}
/* ==========================================
   DATE & TIME
========================================== */
export function updateDateTime() {
  const element = document.getElementById("currentDateTime");
  const now = new Date();
  element.textContent = now.toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

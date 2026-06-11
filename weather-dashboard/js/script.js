const API_KEY = CONFIG.API_KEY;
class StorageManager {
  static THEME_KEY = "weatherTheme";
  static SEARCH_KEY = "recentCities";
  static saveTheme(theme) {
    localStorage.setItem(this.THEME_KEY, theme);
  }
  static loadTheme() {
    return localStorage.getItem(this.THEME_KEY);
  }
  static saveSearch(city) {
    let searches = JSON.parse(localStorage.getItem(this.SEARCH_KEY)) || [];
    searches = searches.filter(c => c !== city);
    searches.unshift(city);
    if (searches.length > 5) searches.pop();
    localStorage.setItem(this.SEARCH_KEY, JSON.stringify(searches));
  }
  static getSearches() {
    return JSON.parse(localStorage.getItem(this.SEARCH_KEY)) || [];
  }
}
class WeatherDashboard {
  constructor() {
    // elements
    this.cityInput = document.getElementById("cityInput");
    this.searchForm = document.getElementById("searchForm");
    this.loadingState = document.getElementById("loadingState");
    this.errorState = document.getElementById("errorState");
    this.weatherContainer = document.getElementById("weatherContainer");
    this.emptyState = document.getElementById("emptyState");
    this.errorMessage = document.getElementById("errorMessage");
    this.retryBtn = document.getElementById("retryBtn");
    this.themeToggle = document.getElementById("themeToggle");
    this.recentSearches = document.getElementById("recentSearches");
    this.controller = null;
    this.lastCity = "";
    this.attachEvents();
    this.loadTheme();
    this.renderRecentSearches();
  }
  /* ================= EVENTS ================= */
  attachEvents() {
    this.searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSearch();
    });
    this.retryBtn.addEventListener("click", () => {
      if (this.lastCity) this.fetchWeather(this.lastCity);
    });
    this.themeToggle.addEventListener("click", () => this.toggleTheme());
  }
  /* ================= SEARCH ================= */
  async handleSearch() {
    const city = this.cityInput.value.trim();
    if (!city) {
      this.showError("Please enter a city name");
      return;
    }
    this.lastCity = city;
    await this.fetchWeather(city);
  }
  async fetchWeather(city) {
    try {
      this.showLoading();
      // cancel previous request (IMPORTANT FIX)
      if (this.controller) this.controller.abort();
      this.controller = new AbortController();
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url, {
        signal: this.controller.signal,
      });
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      this.renderWeather(data);
      StorageManager.saveSearch(city);
      this.renderRecentSearches();
    } catch (error) {
      if (error.name === "AbortError") return;
      this.showError(error.message);
    }
  }
  /* ================= UI STATES ================= */
  showState(state) {
    this.loadingState.classList.add("hidden");
    this.errorState.classList.add("hidden");
    this.weatherContainer.classList.add("hidden");
    this.emptyState.classList.add("hidden");
    if (state === "loading") this.loadingState.classList.remove("hidden");
    if (state === "error") this.errorState.classList.remove("hidden");
    if (state === "weather") this.weatherContainer.classList.remove("hidden");
    if (state === "empty") this.emptyState.classList.remove("hidden");
  }
  showLoading() {
    this.showState("loading");
  }
  showError(message) {
    this.errorMessage.textContent = message;
    this.showState("error");
  }
  /* ================= RENDER WEATHER ================= */
  renderWeather(data) {
    this.showState("weather");
    document.getElementById("cityName").textContent =
      `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent =
      `${Math.round(data.main.temp)}°C`;
    document.getElementById("weatherDescription").textContent =
      data.weather[0].description;
    document.getElementById("humidity").textContent =
      `${data.main.humidity}%`;
    document.getElementById("windSpeed").textContent =
      `${data.wind.speed} km/h`;
    document.getElementById("feelsLike").textContent =
      `${Math.round(data.main.feels_like)}°C`;
    document.getElementById("cloudiness").textContent =
      `${data.clouds.all}%`;
    document.getElementById("weatherIcon").src =
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  }
  /* ================= RECENT SEARCHES ================= */
  renderRecentSearches() {
    const searches = StorageManager.getSearches();
    this.recentSearches.innerHTML = "";
    if (searches.length === 0) {
      this.recentSearches.innerHTML =
        `<div class="empty-recent">No Recent Searches</div>`;
      return;
    }
    searches.forEach(city => {
      const btn = document.createElement("button");
      btn.className = "search-chip";
      btn.textContent = city;
      btn.addEventListener("click", () => {
        this.cityInput.value = city;
        this.fetchWeather(city);
      });
      this.recentSearches.appendChild(btn);
    });
  }
  /* ================= THEME ================= */
  toggleTheme() {
    document.body.classList.toggle("dark");
    StorageManager.saveTheme(
      document.body.classList.contains("dark")
    );
  }
  loadTheme() {
    if (StorageManager.loadTheme() === "true") {
      document.body.classList.add("dark");
    }
  }
}
/* INIT */
new WeatherDashboard();
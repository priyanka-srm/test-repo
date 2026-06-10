const API_KEY = "d3b3b7ce58a320a59aa29b88cab6146e";
class StorageManager {
  static THEME_KEY = "weatherTheme";
  static saveTheme(theme) {
    localStorage.setItem(
      this.THEME_KEY,
      theme
    );
  }
  static loadTheme() {
    return localStorage.getItem(
      this.THEME_KEY
    );
  }
}
class WeatherDashboard {
  constructor() {
    this.cityInput =
      document.getElementById(
        "cityInput"
      );
    this.searchBtn =
      document.getElementById(
        "searchBtn"
      );
    this.weatherCard =
      document.getElementById(
        "weatherCard"
      );
    this.loading =
      document.getElementById(
        "loading"
      );
    this.error =
      document.getElementById(
        "error"
      );
    this.themeToggle =
      document.getElementById(
        "themeToggle"
      );
    this.attachEvents();
    this.loadTheme();
  }
  attachEvents() {
    this.searchBtn.addEventListener(
      "click",
      () => this.handleSearch()
    );
    this.cityInput.addEventListener(
      "keypress",
      (e) => {
        if (e.key === "Enter") {
          this.handleSearch();
        }
      }
    );
    this.themeToggle.addEventListener(
      "click",
      () => this.toggleTheme()
    );
  }
  async handleSearch() {
    const city =
      this.cityInput.value.trim();
    if (!city) {
      this.showError(
        "Please enter a city name."
      );
      return;
    }
    this.showLoading();
    try {
      const data =
        await this.fetchWeather(city);
      this.renderWeather(data);
    }
    catch (error) {
      this.showError(
        error.message
      );
    }
  }
  async fetchWeather(city) {
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const response =
      await fetch(url);
    if (!response.ok) {
      throw new Error(
        `City not found (HTTP ${response.status})`
      );
    }
    const data =
      await response.json();
    return data;
  }
  showLoading() {
    this.weatherCard.classList.add(
      "hidden"
    );
    this.error.classList.add(
      "hidden"
    );
    this.loading.classList.remove(
      "hidden"
    );
  }
  showError(message) {
    this.loading.classList.add(
      "hidden"
    );
    this.weatherCard.classList.add(
      "hidden"
    );
    this.error.textContent =
      message;
    this.error.classList.remove(
      "hidden"
    );
  }
  clearState() {
    this.loading.classList.add(
      "hidden"
    );
    this.error.classList.add(
      "hidden"
    );
  }
  renderWeather(data) {
    this.clearState();
    const cityName =
      document.getElementById(
        "cityName"
      );
    const temperature =
      document.getElementById(
        "temperature"
      );
    const description =
      document.getElementById(
        "description"
      );
    const humidity =
      document.getElementById(
        "humidity"
      );
    const wind =
      document.getElementById(
        "wind"
      );
    const weatherIcon =
      document.getElementById(
        "weatherIcon"
      );
    cityName.textContent =
      `${data.name}, ${data.sys.country}`;
    temperature.textContent =
      `${Math.round(
        data.main.temp
      )}°C`;
    description.textContent =
      data.weather[0]
      .description;
    humidity.textContent =
      `${data.main.humidity}%`;
    wind.textContent =
      `${data.wind.speed} m/s`;
    weatherIcon.src =
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt =
      data.weather[0]
      .description;
    this.weatherCard.classList.remove(
      "hidden"
    );
  }
  toggleTheme() {
    document.body.classList.toggle(
      "dark"
    );
    const isDark =
      document.body.classList.contains(
        "dark"
      );
    StorageManager.saveTheme(
      isDark
    );
  }
  loadTheme() {
    const savedTheme =
      StorageManager.loadTheme();
    if (
      savedTheme === "true"
    ) {
      document.body.classList.add(
        "dark"
      );
    }
  }
}
new WeatherDashboard();
# 🌤️ Advanced Weather Dashboard

A modern, responsive Weather Dashboard web application built using **HTML**, **CSS**, and **JavaScript (ES6+)**.  
This project fetches real-time weather data from the **OpenWeatherMap API** and displays it with a clean UI, dark mode support, and recent search history — all without any frameworks.

---

## 🚀 Live Features

| Feature | Description |
|---|---|
| 🔍 City Search | Search any city worldwide to get live weather |
| 🌡️ Temperature | Displays current temperature in Celsius |
| 💧 Humidity | Shows current humidity percentage |
| 🌬️ Wind Speed | Displays wind speed in km/h |
| 🌡️ Feels Like | Real-feel temperature |
| ☁️ Cloudiness | Cloud coverage percentage |
| 🕐 Recent Searches | Saves last 5 searched cities using localStorage |
| 🌙 Dark Mode | Toggle dark/light theme with persistence |
| ⚡ Loading State | Spinner shown while fetching data |
| ❌ Error Handling | User-friendly error messages with retry option |
| 📱 Responsive Design | Works on mobile, tablet, and desktop |

---

## 🧠 JavaScript Concepts Used

### 1. Classes & OOP

The entire app is structured using ES6 Classes — `WeatherDashboard` handles all UI logic and `StorageManager` handles localStorage.

```js
class WeatherDashboard {
  constructor() {
    this.cityInput = document.getElementById("cityInput");
    this.controller = null;
    this.lastCity = "";
    this.attachEvents();
  }
}
```

---

### 2. Async / Await + Fetch API

Real-time weather data is fetched from OpenWeatherMap using `async/await` with proper error handling.

```js
async fetchWeather(city) {
  const response = await fetch(url, { signal: this.controller.signal });
  if (!response.ok) throw new Error("City not found");
  const data = await response.json();
  this.renderWeather(data);
}
```

---

### 3. AbortController (Request Cancellation)

Prevents stale responses when a new search is triggered before the previous one completes.

```js
if (this.controller) this.controller.abort();
this.controller = new AbortController();
const response = await fetch(url, { signal: this.controller.signal });
```

---

### 4. Try / Catch / Error Handling

Gracefully handles network failures, invalid city names, and aborted requests.

```js
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error("City not found");
} catch (error) {
  if (error.name === "AbortError") return;
  this.showError(error.message);
}
```

---

### 5. localStorage (Static Class Methods)

Theme preference and recent searches are saved to `localStorage` using a dedicated `StorageManager` class with static methods.

```js
class StorageManager {
  static saveSearch(city) {
    let searches = JSON.parse(localStorage.getItem("recentCities")) || [];
    searches = searches.filter(c => c !== city);
    searches.unshift(city);
    if (searches.length > 5) searches.pop();
    localStorage.setItem("recentCities", JSON.stringify(searches));
  }
}
```

---

### 6. DOM Manipulation & Dynamic Rendering

Weather data and recent search chips are rendered dynamically into the DOM.

```js
searches.forEach(city => {
  const btn = document.createElement("button");
  btn.className = "search-chip";
  btn.textContent = city;
  btn.addEventListener("click", () => this.fetchWeather(city));
  this.recentSearches.appendChild(btn);
});
```

---

### 7. UI State Management

A clean `showState()` method manages four UI states — `loading`, `error`, `weather`, and `empty` — by toggling CSS `hidden` classes.

```js
showState(state) {
  ["loadingState", "errorState", "weatherContainer", "emptyState"]
    .forEach(id => document.getElementById(id).classList.add("hidden"));

  if (state === "loading") this.loadingState.classList.remove("hidden");
  if (state === "error")   this.errorState.classList.remove("hidden");
  if (state === "weather") this.weatherContainer.classList.remove("hidden");
  if (state === "empty")   this.emptyState.classList.remove("hidden");
}
```

---

### 8. Dark Mode Toggle with Persistence

Theme is toggled using `classList.toggle("dark")` on `body` and saved to localStorage so it persists on refresh.

```js
toggleTheme() {
  document.body.classList.toggle("dark");
  StorageManager.saveTheme(document.body.classList.contains("dark"));
}
```

---

### 9. Template Literals & Destructuring

Used throughout for clean, readable DOM updates.

```js
document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
```

---

## 🛠️ Technologies Used

- **HTML5** — Semantic structure with proper sections and accessibility
- **CSS3** — Flexbox, Grid, CSS transitions, dark mode, responsive media queries
- **JavaScript ES6+** — Classes, async/await, fetch, AbortController, localStorage
- **OpenWeatherMap API** — Live weather data source

---

## 📁 Project Structure

```
weather-dashboard/
│
├── index.html        → Main HTML structure
├── css/
│   └── style.css     → All styling including dark mode & responsive
└── js/
    └── script.js     → Full app logic (WeatherDashboard + StorageManager)
```

---

## ⚙️ How to Run

1. Clone or download this repository
2. Get a free API key from [openweathermap.org](https://openweathermap.org/api)
3. Replace the API key in `script.js`:

```js
const API_KEY = "your_api_key_here";
```

4. Open `index.html` directly in your browser — no server needed!

---

## 🌐 API Reference

This project uses the **OpenWeatherMap Current Weather API**.

```
GET https://api.openweathermap.org/data/2.5/weather
    ?q={city_name}
    &appid={API_KEY}
    &units=metric
```

| Parameter | Description |
|---|---|
| `q` | City name (e.g. `Chennai`) |
| `appid` | Your API key |
| `units` | `metric` for Celsius |

---

## 📸 UI States

| State | When it appears |
|---|---|
| 🌍 Empty State | On initial page load |
| ⏳ Loading State | While API fetch is in progress |
| ❌ Error State | If city not found or network fails |
| ✅ Weather State | On successful API response |

---

## 🔮 Future Improvements

- [ ] 5-day weather forecast section
- [ ] Geolocation — detect user's current city automatically
- [ ] Temperature unit toggle (°C / °F)
- [ ] Weather charts using Chart.js
- [ ] Hourly forecast cards
- [ ] Progressive Web App (PWA) support
- [ ] Search suggestions / autocomplete

---

## 🧪 Key Concepts Demonstrated

This project is a strong **Phase 6 Advanced JavaScript** mini project because it combines:

- **OOP with ES6 Classes** — structured, maintainable code
- **Async programming** — real API calls with async/await
- **AbortController** — advanced fetch management
- **localStorage** — client-side data persistence
- **State management** — clean UI state transitions
- **Error handling** — production-level try/catch usage
- **DOM manipulation** — fully dynamic rendering

All implemented in **Vanilla JavaScript** with zero frameworks or libraries.

---
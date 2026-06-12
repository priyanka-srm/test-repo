# 🌤️ Advanced Weather Dashboard

![HTML](https://img.shields.io/badge/HTML5-orange?style=for-the-badge&logo=html5) ![CSS](https://img.shields.io/badge/CSS3-blue?style=for-the-badge&logo=css3) ![JavaScript](https://img.shields.io/badge/JavaScript-yellow?style=for-the-badge&logo=javascript) ![API](https://img.shields.io/badge/OpenWeatherMap-API-green?style=for-the-badge) ![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=for-the-badge)

# 🚀 Live Demo  
https://your-live-demo-link.com

# 📌 Project Overview  
The Advanced Weather Dashboard is a real-time weather application built using HTML, CSS, and JavaScript. It allows users to search any city and view live weather data using the OpenWeatherMap API. This project demonstrates real-world frontend development concepts such as API integration, asynchronous JavaScript, DOM manipulation, UI state management, error handling, and local storage persistence.

# ✨ Features  
- Search weather by city name  
- Live weather data using OpenWeatherMap API  
- Dynamic UI states (Loading, Error, Empty, Weather)  
- Recent search history using Local Storage  
- Clickable recent searches  
- Dark / Light mode toggle  
- AbortController for canceling API requests  
- Fully responsive UI  
- Proper error handling  

# 🧠 Tech Stack  
HTML5, CSS3 (Flexbox, Grid, Glassmorphism UI), JavaScript (ES6+), OpenWeatherMap API, Fetch API, Local Storage API, AbortController  

# 📁 Project Structure 

weather-dashboard/
├── html/
│   └── index.html
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   ├── config.js
│   └── config.example.js
├── .gitignore
└── README.md

# ⚙️ How It Works  
User enters a city name and submits the search form. The app sends a request to the OpenWeatherMap API and displays a loading state while fetching data. Once data is received, the UI updates dynamically with temperature, humidity, wind speed, cloudiness, and weather description. If an error occurs such as invalid city, API failure, or network issue, an error state is shown with retry option. Recent searches are stored in Local Storage and displayed as clickable chips for quick access. Dark mode preference is also stored permanently. AbortController is used to cancel previous API requests when a new search is triggered to prevent overlapping responses.

# 🔑 API Setup  
Create a config.js file:  
const CONFIG = { API_KEY: "YOUR_API_KEY_HERE" };  
Use config.example.js as reference and never expose API keys publicly.

# 🧩 Core Concepts Used  
API Integration used to fetch real-time weather data from OpenWeatherMap. Async/Await used for clean asynchronous flow. DOM Manipulation used to dynamically update UI based on API response. UI State Management handles loading, error, empty, and success states. AbortController prevents multiple overlapping API calls. Local Storage stores theme preference and recent searches. Event Handling manages user interactions like search, retry, theme toggle, and recent clicks.

# 🔄 Application Flow  
User enters city name → API request triggered → Loading state shown → Weather data received → UI updated dynamically → City saved in recent searches → User can reuse searches instantly.

# ⚠️ Error Handling  
Handles invalid city (404), invalid API key (401), network failure, and aborted requests using proper UI feedback.

# 🌙 Dark Mode  
Theme toggle between light and dark mode with persistence using Local Storage.

# 🕒 Recent Searches  
Stores last 5 cities, removes duplicates, and allows instant re-search via click.

# 🚧 Challenges Faced  
Managing multiple API requests, handling UI state transitions, preventing request overlap using AbortController, ensuring data persistence using Local Storage, and implementing proper error handling.

# 📚 Concepts Practiced  
Fetch API, Async/Await, DOM Manipulation, Event Handling, UI State Management, AbortController, Local Storage, Error Handling.


# 🚀 Future Improvements  
5-day forecast, geolocation weather detection, auto-suggestions, animated weather backgrounds, unit conversion, and PWA support.


# 🎯 Conclusion  
This Advanced Weather Dashboard project demonstrates real-world frontend development skills including API integration, asynchronous JavaScript, UI state handling, and responsive design. It is a strong portfolio-ready project showcasing modern JavaScript development ability.
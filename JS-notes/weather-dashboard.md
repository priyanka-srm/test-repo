# 🌤 Advanced Weather Dashboard

A modern Weather Dashboard built using **HTML, CSS, and Vanilla JavaScript (ES Modules)**.

The application fetches real-time weather information from the OpenWeatherMap API and displays weather highlights in a clean and responsive user interface. The project follows a modular JavaScript architecture with separated UI, API, Storage, State, and Utility modules for better scalability and maintainability.

---

## 🚀 Live Features

- 🔍 Search weather by city
- 🌍 Real-time weather data using OpenWeatherMap API
- 📍 Current location weather using Geolocation API
- 🌙 Dark / Light theme toggle
- 💾 Theme preference stored using Local Storage
- 🕓 Recent search history
- 🗑 Clear recent searches
- 🔄 Retry button for failed requests
- ⏳ Loading state
- ❌ Error handling with user-friendly messages
- 📱 Fully responsive layout
- 🧩 Modular JavaScript using ES Modules
- 🚫 API request cancellation using AbortController

---


# 🛠 Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- ES Modules
- OpenWeatherMap API
- Local Storage API
- Fetch API
- Geolocation API
- AbortController

---

# 📂 Project Structure

```
Weather Dashboard
│
├── css
│   └── style.css
│
├── index.html
│
├── js
│   ├── api.js
│   ├── config.js
│   ├── config.example.js
│   ├── handlers.js
│   ├── script.js
│   ├── state.js
│   ├── storage.js
│   ├── ui.js
│   └── utils.js
│
└── .gitignore
```

---

# 📦 Module Overview

## script.js

Application entry point.

Responsible for

- Initializing the application
- Starting the event flow

---

## handlers.js

Handles all application logic.

Includes

- Search handling
- Retry functionality
- Theme toggle
- Current location
- Recent search loading
- Event listeners
- Application initialization

---

## api.js

Handles API communication.

Includes

- Weather API requests
- Current location weather
- City suggestions
- AbortController implementation
- Error handling

---

## ui.js

Responsible for updating the user interface.

Includes

- Loading state
- Error state
- Empty state
- Weather rendering
- Recent searches rendering
- Theme button updates
- Date & time updates

---

## storage.js

Handles Local Storage.

Stores

- Theme preference
- Recent searches

---

## state.js

Stores application state.

Includes

- Current city
- Weather data
- AbortController
- Theme state
- Suggestions
- Loading state
- Error state

---

## utils.js

Contains reusable helper functions.

Includes

- Capitalize text
- Format date
- Format time
- Debounce
- Country flag conversion
- Weather icon generation
- Visibility formatting
- Wind speed formatting

---

# 🌐 API

This project uses

**OpenWeatherMap API**

Weather Endpoint

```
https://api.openweathermap.org/data/2.5/weather
```

Geocoding Endpoint

```
https://api.openweathermap.org/geo/1.0/direct
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/your-username/weather-dashboard.git
```

Move into the project

```bash
cd weather-dashboard
```

Create your configuration file

```javascript
// config.js

export const CONFIG = {
    API_KEY: "YOUR_API_KEY"
};
```

Run using Live Server.

---

# 💡 JavaScript Concepts Used

- ES Modules
- Import / Export
- Async / Await
- Fetch API
- Promises
- Classes
- Event Listeners
- DOM Manipulation
- Template Literals
- Arrow Functions
- Array Methods
- Local Storage
- AbortController
- Error Handling
- Geolocation API

---

# 📱 Responsive Design

The application is optimized for

- Desktop
- Tablet
- Mobile devices

---

# 🔒 Security

Sensitive configuration files are ignored using

```
.gitignore
```

```
js/config.js
```

Only

```
config.example.js
```

is committed to the repository.

---

# 📚 Learning Outcomes

This project helped practice

- Modular JavaScript architecture
- API integration
- State management
- Local Storage
- Responsive UI development
- Error handling
- Code organization
- Clean folder structure
- Reusable utility functions
- Separation of concerns

---
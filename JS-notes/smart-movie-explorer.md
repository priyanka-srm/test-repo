# 🎬 Smart Movie Explorer

A modern movie discovery web application built using **HTML, CSS, and JavaScript** that allows users to search movies, view detailed information, save favorite movies, maintain recently viewed history, and restore search state using Browser APIs.

This project demonstrates real-world frontend development concepts including API integration, asynchronous JavaScript, DOM manipulation, state persistence, URL management, and browser storage APIs.

---

# 🚀 Features

✅ Search Movies using OMDb API

✅ Default Movies on Initial Load

✅ Movie Details Popup

✅ Dark / Light Theme Toggle

✅ Favorite Movies using localStorage

✅ Recently Viewed Movies using sessionStorage

✅ Search Query Synchronization using URL API

✅ Search State Restoration using URLSearchParams

✅ Loading States

✅ No Results Handling

✅ Responsive Movie Grid Layout

✅ API Key Security using config.js

---

# 🧠 Concepts Practiced

## JavaScript ES6+

- Arrow Functions
- Template Literals
- Async / Await
- Event Handling
- DOM Manipulation
- Array Methods
- JSON Handling

## Browser APIs (Phase 7)

### localStorage

Used to permanently store favorite movies inside the browser.

### sessionStorage

Used to maintain recently viewed movies during the current browser session.

### URL API

Used to synchronize search queries with the browser URL.

Example:

```text
?search=leo
```

### URLSearchParams

Used to restore search state when the page reloads.

---

# 🔐 API Key Security

To avoid exposing API keys publicly:

- API key moved to `config.js`
- `config.js` added to `.gitignore`
- `config.example.js` provided as a template
- Real API key is never pushed to GitHub

Example:

```js
const CONFIG = {
  API_KEY: "YOUR_API_KEY_HERE"
};
```

---

# 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- OMDb API
- Browser APIs
  - localStorage
  - sessionStorage
  - URL API
  - URLSearchParams

---

# 📁 Project Structure

```text
smart-movie-explorer/
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
```

---

# ⚙️ How It Works

1. User searches for a movie.
2. Search query is added to the URL.
3. Application fetches movie data from OMDb API.
4. Movies are rendered dynamically.
5. Clicking a movie opens detailed information.
6. Favorite movies are stored in localStorage.
7. Recently viewed movies are stored in sessionStorage.
8. Page refresh restores search state automatically.

---

# 🎯 Challenges Solved

### Browser Storage Management

Implemented persistent and temporary storage using localStorage and sessionStorage.

### URL State Management

Search state remains available even after page refresh.

### API Key Protection

Separated API key configuration from application logic and prevented secret keys from being committed to GitHub.

### Dynamic UI Rendering

Movie cards and popup content are generated dynamically using JavaScript.

---

# 🚀 Future Improvements

- Watchlist System
- Pagination
- Infinite Scroll
- Movie Ratings Filter
- Trailer Integration
- Genre Based Filtering
- PWA Support

---

# 📌 Conclusion

Smart Movie Explorer demonstrates practical frontend development skills including API integration, browser storage management, URL state synchronization, asynchronous JavaScript, and responsive UI development.

The project serves as a strong portfolio piece for showcasing real-world JavaScript, Browser APIs, Local Storage, Session Storage, URL Management, and API Security concepts.
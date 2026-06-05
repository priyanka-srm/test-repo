# 🎬 Smart Movie Explorer

A modern movie search web application built using HTML, CSS, and JavaScript.  
This project fetches movie data dynamically using the OMDB API and displays movie details in a clean responsive UI.

---

# 🚀 Features

✅ Search Movies  
✅ Default Movies on Load  
✅ Movie Details Popup  
✅ Theme Toggle (Dark / Light Mode)  
✅ Favorite Button UI  
✅ Loading Indicator  
✅ No Results Message  
✅ Responsive Movie Cards  
✅ API Data Fetching  

---

# 🧠 ES6+ Concepts Used

## 1. Arrow Functions
```js
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchMovies();
  }
});
```

---

## 2. Template Literals
```js
const res = await fetch(
  `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
);
```

---

## 3. Destructuring
```js
const { Title, Poster } = movie;
```

---

## 4. Spread Operator
```js
const updatedMovies = [...movies];
```

---

## 5. Default Parameters
```js
function showMessage(msg = "Loading...") {
  console.log(msg);
}
```

---

## 6. Optional Chaining
```js
movie?.Poster
```

---

## 7. Nullish Coalescing
```js
const movieName = movie.Title ?? "Unknown";
```

---

# 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- OMDB API

---

# 🌐 API Used

OMDB API

Example:
```js
https://www.omdbapi.com/?apikey=YOUR_API_KEY&s=avengers
```

---

# 📄 HTML Code

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">

  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

  <title>Smart Movie Explorer</title>

  <link rel="stylesheet"
        href="../css/style.css">
</head>

<body>

<header>

  <h1>🎬 Smart Movie Explorer</h1>

  <div class="search-box">

    <input type="text"
           id="searchInput"
           placeholder="Search movies...">

    <button id="searchBtn">
      Search
    </button>

    <button id="themeToggle">
      🌙 Theme
    </button>

  </div>

</header>

<section id="moviesContainer"></section>

<!-- Popup -->

<div id="popup">

  <div class="popup-content">

    <span id="close">✖</span>

    <img id="popup-img">

    <h2 id="popup-title"></h2>

    <p id="popup-desc"></p>

  </div>

</div>

<script src="../js/script.js"></script>

</body>
</html>
```

---

# 🎨 CSS Code

```css
body {
  margin: 0;
  font-family: sans-serif;
  background: #0f0f0f;
  color: white;
  transition: 0.3s;
}

/* Header */

header {
  text-align: center;
  padding: 20px;
  background: #141414;
  position: sticky;
  top: 0;
}

.search-box {
  margin-top: 10px;
}

input {
  padding: 10px;
  width: 260px;
  border-radius: 5px;
  border: none;
}

button {
  padding: 10px;
  background: red;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 5px;
}

/* Movies Grid */

#moviesContainer {
  display: grid;
  grid-template-columns:
  repeat(auto-fill, minmax(180px, 1fr));

  gap: 20px;
  padding: 20px;
}

/* Movie Card */

.movieCard {
  background: #1c1c1c;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;
}

.movieCard:hover {
  transform: scale(1.08);
}

.movieCard img {
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.movieInfo {
  padding: 10px;
  text-align: center;
}

/* Loader */

.loader {
  text-align: center;
  font-size: 20px;
}

/* Popup */

#popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  background: rgba(0,0,0,0.85);

  justify-content: center;
  align-items: center;
}

.popup-content {
  background: #222;
  padding: 20px;
  border-radius: 10px;
  width: 320px;
  text-align: center;
}

.popup-content img {
  width: 100%;
  border-radius: 10px;
}

#close {
  float: right;
  cursor: pointer;
  font-size: 20px;
}

/* Theme */

.light-mode {
  background: #f5f5f5;
  color: black;
}

.light-mode header {
  background: #ffffff;
}

.light-mode .movieCard {
  background: white;
  color: black;
}

/* Favorite Button */

.favBtn {
  margin-top: 8px;
  padding: 8px;
  background: crimson;
  border-radius: 5px;
  width: 100%;
}

/* No Results */

.noResults {
  text-align: center;
  font-size: 22px;
  margin-top: 50px;
}
```

---

# ⚡ JavaScript Code

```js
const API_KEY = "8793cc0e";

/* Elements */

const searchBtn =
document.getElementById("searchBtn");

const searchInput =
document.getElementById("searchInput");

const moviesContainer =
document.getElementById("moviesContainer");

const popup =
document.getElementById("popup");

const popupImg =
document.getElementById("popup-img");

const popupTitle =
document.getElementById("popup-title");

const popupDesc =
document.getElementById("popup-desc");

const closeBtn =
document.getElementById("close");

const themeToggle =
document.getElementById("themeToggle");

/* Load Default Movies */

window.onload = () => {
  loadDefaultMovies();
};

/* Events */

searchBtn.addEventListener(
  "click",
  searchMovies
);

searchInput.addEventListener(
  "keypress",
  (e) => {

    if (e.key === "Enter") {
      searchMovies();
    }

  }
);

/* Theme Toggle */

themeToggle.addEventListener(
  "click",
  () => {
    document.body.classList.toggle(
      "light-mode"
    );
  }
);

/* Default Movies */

async function loadDefaultMovies() {

  moviesContainer.innerHTML =
  "<p class='loader'>Loading movies...</p>";

  try {

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=avengers`
    );

    const data = await res.json();

    if (data.Response === "True") {

      displayMovies(data.Search);

    } else {

      moviesContainer.innerHTML =
      `<p>${data.Error}</p>`;
    }

  } catch {

    moviesContainer.innerHTML =
    "<p>Error loading data</p>";
  }
}

/* Search Movies */

async function searchMovies() {

  const query =
  searchInput.value.trim();

  if (!query) {

    alert("Enter movie name");

    return;
  }

  moviesContainer.innerHTML =
  "<p class='loader'>Searching...</p>";

  try {

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
    );

    const data = await res.json();

    if (data.Response === "True") {

      displayMovies(data.Search);

    } else {

      moviesContainer.innerHTML = `
        <div class="noResults">
          😢 No movies found
        </div>
      `;
    }

  } catch {

    moviesContainer.innerHTML =
    "<p>Error fetching data</p>";
  }
}

/* Display Movies */

function displayMovies(movies) {

  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {

    const poster =
      movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450";

    const card =
    document.createElement("div");

    card.classList.add("movieCard");

    card.innerHTML = `
      <img src="${poster}">

      <div class="movieInfo">

        <h3>${movie.Title}</h3>

        <button class="favBtn">
          ❤️ Favorite
        </button>

      </div>
    `;

    card.addEventListener(
      "click",
      () => {
        showDetails(movie.imdbID);
      }
    );

    moviesContainer.appendChild(card);

  });
}

/* Show Details */

async function showDetails(id) {

  try {

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
    );

    const movie = await res.json();

    popupImg.src = movie.Poster;

    popupTitle.innerText =
    movie.Title;

    popupDesc.innerText =
    movie.Plot;

    popup.style.display = "flex";

  } catch {

    alert("Error loading details");
  }
}

/* Close Popup */

closeBtn.addEventListener(
  "click",
  () => {
    popup.style.display = "none";
  }
);

/* Outside Click */

popup.addEventListener(
  "click",
  (e) => {

    if (e.target === popup) {

      popup.style.display = "none";
    }

  }
);
```

---

# 🚀 Future Improvements

- Add Local Storage Favorites
- Pagination
- Watchlist Feature
- Movie Ratings Filter
- Trailer Integration
- Responsive Mobile Navbar

---

# 📌 Conclusion

This project helped in understanding:

- DOM Manipulation
- API Fetching
- ES6+ Features
- Event Handling
- Async/Await
- Dynamic UI Rendering

The Smart Movie Explorer project demonstrates practical frontend development concepts using modern JavaScript.
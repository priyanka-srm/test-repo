const API_KEY = CONFIG.API_KEY;
/* Elements */
const FAVORITES_KEY = "favoriteMovies";
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("moviesContainer");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupDesc = document.getElementById("popup-desc");
const closeBtn = document.getElementById("close");
const themeToggle = document.getElementById("themeToggle");
const favouritesBtn = document.getElementById("favoritesBtn");
const favoritesContainer = document.getElementById("favoritesContainer");
const recentBtn = document.getElementById("recentBtn");
const recentContainer = document.getElementById("recentContainer");
/* Load Default Movies */
window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const query =params.get("search");
  if (query) {
    searchInput.value = query;
    searchMovies();
  } else {
    loadDefaultMovies();
  }
};
/* Events */
searchBtn.addEventListener("click", searchMovies);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchMovies();
  }
});
favouritesBtn.addEventListener("click" , showFavorites);
recentBtn.addEventListener("click" , showRecentMovies);
/* Theme Toggle */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});
/* Load Default Movies */
async function loadDefaultMovies() {
  moviesContainer.innerHTML =
    "<p class='loader'>Loading movies...</p>";
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=avengers`);
      if (!res.ok) {
        throw new Error("Network Error");
      }
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
  const query = searchInput.value.trim();
  if (! query) {
    alert("Enter movie name");
    return;
  }
  const url = new URL(window.location);
  url.searchParams.set("search" , query);
  window.history.pushState({} , "" , url);
  moviesContainer.innerHTML =
    "<p class='loader'>Searching...</p>";
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
    );
    if (!res.ok) {
      throw new Error("Network Error");
    }
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
const NO_POSTER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450'%3E%3Crect width='100%25' height='100%25' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' fill='%23999' text-anchor='middle'%3ENo Poster%3C/text%3E%3C/svg%3E";
/* Display Movies */
function displayMovies(movies) {
  moviesContainer.innerHTML = "";
  movies.forEach((movie) => {
    const poster = movie.Poster !== "N/A" ? movie.Poster : NO_POSTER;
    const card = document.createElement("div");
    card.classList.add("movieCard");
    const img = document.createElement("img");
    img.src = poster;
    img.onerror = () => {
      img.src = NO_POSTER;
    };
    const movieInfo = document.createElement("div");
    movieInfo.classList.add("movieInfo");
    const title = document.createElement("h3");
    title.textContent = movie.Title;
    const favBtn = document.createElement("button");
    favBtn.classList.add("favBtn");
    favBtn.textContent = "❤️ Favourite";
    movieInfo.appendChild(title);
    movieInfo.appendChild(favBtn);
    card.appendChild(img);
    card.appendChild(movieInfo);
    favBtn.addEventListener("click" , (e) => {
      e.stopPropagation();
      saveFavorite(movie);
    }
  );
    card.addEventListener("click", () => {
      showDetails(movie.imdbID);
    });
    moviesContainer.appendChild(card);
  });
}
/* Show Details */
/* favourite movies */
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}
function saveFavorite(movie) {
  const favorites = getFavorites();
  const exists = favorites.some(m => m.imdbID === movie.imdbID);
  if(!exists) {
    favorites.push(movie);
    localStorage.setItem( FAVORITES_KEY, JSON.stringify(favorites));
    alert("Added to Favorites");
  }
}
/* show favorites */
function showFavorites() {
  const favorites = getFavorites();
  if (favorites.length === 0) {
    favoritesContainer.innerHTML = "<p> No Favorite Movies Yet </p>";
    return;
  }
  favoritesContainer.innerHTML = "<h2> ❤️ Favorite Movies </h2>";
  favorites.forEach((movie) => {
    const item = document.createElement("p");
    item.textContent = movie.Title;
    favoritesContainer.appendChild(item);
  } );
}
/* show recently viewed */
function showRecentMovies() {
  const recent = JSON.parse(sessionStorage.getItem("recentMovies") || "[]");
  if (recent.length === 0) {
    recentContainer.innerHTML = "<p> No Recently Viewed Movies </p>";
    return;
  }
  recentContainer.innerHTML = "<h2> 🕒 Recently Viewed Movies</h2>";
  recent.forEach((movie) => {
    const item = document.createElement("p");
    item.textContent = movie.Title;
    recentContainer.appendChild(item);
  } );
}
/* recently viewed */
function saveRecentlyViewed(movie) {
  let recent = JSON.parse(sessionStorage.getItem ("recentMovies") || "[]");
  recent = recent.filter(m => m.imdbID !== movie.imdbID);
  recent.unshift(movie);
  if (recent.length > 5) {
    recent.pop();
  }
  sessionStorage.setItem("recentMovies" , JSON.stringify(recent));
}
async function showDetails(id) {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
    );
    if(!res.ok) {
      throw new Error("Network Error");
    }
    const movie = await res.json();
    saveRecentlyViewed(movie);
    popupImg.src = movie.Poster;
    popupTitle.innerText = movie.Title;
    popupDesc.innerText = movie.Plot;
    popup.style.display = "flex";
  } catch {
    alert("Error loading details");
  }
}
/* Close Popup */
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});
/* Click Outside Popup */
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});
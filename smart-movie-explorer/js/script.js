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
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchMovies();
  }
});
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
  const query = searchInput.value.trim();
  const url = new URL(window.location);
  url.searchParams.set("search" , query);
  window.history.pushState({} , "" , url);
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
    const card = document.createElement("div");
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
    const favBtn = card.querySelector(".favBtn");
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
  return JSON.parse(
    localStorage.getItem(
      FAVORITES_KEY
    ) || "[]"
  );
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
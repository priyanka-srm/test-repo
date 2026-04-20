const API_KEY = "8793cc0e"; // my key
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("moviesContainer");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupDesc = document.getElementById("popup-desc");
const closeBtn = document.getElementById("close");
/* Load default movies */
window.onload = () => {
  loadDefaultMovies();
};
/* Events */
searchBtn.addEventListener("click", searchMovies);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMovies();
});
/* Load default */
async function loadDefaultMovies() {
  moviesContainer.innerHTML = "<p class='loader'>Loading movies...</p>";
  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=avengers`);
    const data = await res.json();
    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      moviesContainer.innerHTML = `<p>${data.Error}</p>`;
    }
  } catch {
    moviesContainer.innerHTML = "<p>Error loading data</p>";
  }
}
/* Search */
async function searchMovies() {
  const query = searchInput.value.trim();
  if (!query) {
    alert("Enter movie name");
    return;
  }
  moviesContainer.innerHTML = "<p class='loader'>Searching...</p>";
  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    const data = await res.json();
    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      moviesContainer.innerHTML = `<p>${data.Error}</p>`;
    }
  } catch {
    moviesContainer.innerHTML = "<p>Error fetching data</p>";
  }
}
/* Display */
function displayMovies(movies) {
  moviesContainer.innerHTML = "";
  movies.forEach(movie => {
    const poster = movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450";
    const card = document.createElement("div");
    card.classList.add("movieCard");
    card.innerHTML = `
      <img src="${poster}">
      <div class="movieInfo">
        <h3>${movie.Title}</h3>
      </div>
    `;
    card.addEventListener("click", () => showDetails(movie.imdbID));
    moviesContainer.appendChild(card);
  });
}
/* Details */
async function showDetails(id) {
  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
    const movie = await res.json();
    popupImg.src = movie.Poster;
    popupTitle.innerText = movie.Title;
    popupDesc.innerText = movie.Plot;
    popup.style.display = "flex";
  } catch {
    alert("Error loading details");
  }
}
/* Close popup */
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});
/* Click outside */
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});
import { handleSearch, handleMovieDetails } from "./handlers.js";
import { getFavorites, getRecentMovies, saveTheme, loadTheme } from "./storage.js";
import { showError } from "./ui.js";
// Elements
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const themeToggle = document.getElementById("themeToggle");
const favoritesBtn = document.getElementById("favoritesBtn");
const recentBtn = document.getElementById("recentBtn");
const favoritesContainer = document.getElementById("favoritesContainer");
const recentContainer = document.getElementById("recentContainer");
// SEARCH 
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (!query) {
        showError("Please enter movie name");
        return;
    }
    handleSearch(query);
    searchInput.value = "";
});
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const query = searchInput.value.trim();
        if (!query) {
            showError("Please enter movie name");
            return;
        }
        handleSearch(query);
        searchInput.value = "";
    }
});
// FAVORITES 
favoritesBtn.addEventListener("click", () => {
    const favorites = getFavorites();
    favoritesContainer.innerHTML = "";
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>No Favorite Movies</p>";
        return;
    }
    favoritesContainer.innerHTML = "<h2>❤️ Favorite Movies</h2>";
    favorites.forEach(movie => {
        const p = document.createElement("p");
        p.textContent = movie.Title;
        favoritesContainer.appendChild(p);
    });
});
// RECENT
recentBtn.addEventListener("click", () => {
    const recent = getRecentMovies();
    recentContainer.innerHTML = "";
    if (recent.length === 0) {
        recentContainer.innerHTML = "<p>No Recently Viewed Movies</p>";
        return;
    }
    recentContainer.innerHTML = "<h2>🕒 Recently Viewed</h2>";
    recent.forEach(movie => {
        const p = document.createElement("p");
        p.textContent = movie.Title;
        recentContainer.appendChild(p);
    });
});
// POPUP CLOSE 
closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});
popup.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.style.display = "none";
    }
});
// Initialize theme on page load
function initTheme() {
    const theme = loadTheme();
    if (theme === "light") {
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.remove("light-mode");
    }
}
initTheme();
handleSearch("Avengers");
// Theme toggle
themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-mode");
    saveTheme(isLight ? "light" : "dark");
});
document.addEventListener( "showMovieDetails",(event)=>{
    handleMovieDetails(event.detail);
});
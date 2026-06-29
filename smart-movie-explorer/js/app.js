import { handleSearch, handleMovieDetails } from "./handlers.js";
import { getFavorites, getRecentMovies, saveTheme, loadTheme } from "./storage.js";
import { showError, renderFavorites, renderRecent } from "./ui.js";
import { debounce } from "./utils.js";
// Elements
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const themeToggle = document.getElementById("themeToggle");
const favoritesBtn = document.getElementById("favoritesBtn");
const recentBtn = document.getElementById("recentBtn");
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
const searchHandler = debounce((query)=>{
    handleSearch(query);
},400);
searchInput.addEventListener("input",()=>{
    const query = searchInput.value.trim();
    if(query){
        searchHandler(query);
    }
});
// FAVORITES 
favoritesBtn.addEventListener("click", () => {
    const favorites = getFavorites();
    renderFavorites(favorites);
});
// RECENT
recentBtn.addEventListener("click", () => {
    const recent = getRecentMovies();
    renderRecent(recent);
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
const FAVORITES_KEY = "favoriteMovies";
// get favorites
export function getFavorites(){
    try {
        return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    }
    catch {
        return[];
    }
}
// save favorite
export function saveFavorite(movie){
    const favorites = getFavorites();
    const exists = favorites.some(item => item.imdbID === movie.imdbID);
    if(!exists){
        favorites.push(movie);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
}
// get recently viewed
export function getRecentMovies(){
    try {
        return JSON.parse(sessionStorage.getItem("recentMovies")) || [];
    }
    catch {
        return [];
    }
}
// save recently viewed
export function saveRecentlyViewed(movie){
    let recent = getRecentMovies();
    recent = recent.filter(item => item.imdbID !== movie.imdbID);
    recent.unshift(movie);
    if(recent.length > 5){
        recent.pop();
    }
    sessionStorage.setItem( "recentMovies", JSON.stringify(recent));
}
// save theme 
const THEME_KEY = "theme";
export function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
}
export function loadTheme() {
    return localStorage.getItem(THEME_KEY);
}
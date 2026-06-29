import { state } from "./state.js";
import { saveFavorite } from "./storage.js";

const moviesContainer = document.getElementById("moviesContainer");
const favoritesContainer = document.getElementById("favoritesContainer");
const recentContainer = document.getElementById("recentContainer");

const NO_POSTER = "https://placehold.co/300x450";


// ================= LOADER =================
export function showLoader() {
    moviesContainer.innerHTML = "";

    const loader = document.createElement("p");
    loader.className = "loader";
    loader.textContent = "Loading...";

    moviesContainer.appendChild(loader);
}


// ================= MOVIE GRID =================
export function renderMovies() {
    // IMPORTANT: clear other sections to avoid UI overlap
    favoritesContainer.innerHTML = "";
    recentContainer.innerHTML = "";
    moviesContainer.innerHTML = "";

    state.movies.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movieCard";

        const img = document.createElement("img");
        img.src = movie.Poster !== "N/A" ? movie.Poster : NO_POSTER;
        img.alt = movie.Title;

        img.onerror = () => {
            img.src = NO_POSTER;
        };

        const info = document.createElement("div");
        info.className = "movieInfo";

        const title = document.createElement("h3");
        title.textContent = movie.Title;

        const favBtn = document.createElement("button");
        favBtn.textContent = "❤️ Favorite";
        favBtn.className = "favBtn";

        favBtn.onclick = (event) => {
            event.stopPropagation();
            saveFavorite(movie);

            // small UX feedback
            favBtn.textContent = "❤️ Added";
            setTimeout(() => {
                favBtn.textContent = "❤️ Favorite";
            }, 1000);
        };

        info.appendChild(title);
        info.appendChild(favBtn);

        card.appendChild(img);
        card.appendChild(info);

        card.addEventListener("click", () => {
            document.dispatchEvent(new CustomEvent("showMovieDetails", {
                detail: movie.imdbID
            }));
        });

        moviesContainer.appendChild(card);
    });
}


// ================= POPUP =================
export function showDetailsPopup(movie) {
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const popupTitle = document.getElementById("popup-title");
    const popupDesc = document.getElementById("popup-desc");

    popupImg.src = movie.Poster && movie.Poster !== "N/A"
        ? movie.Poster
        : NO_POSTER;

    popupTitle.textContent = movie.Title;
    popupDesc.textContent = movie.Plot && movie.Plot !== "N/A"
        ? movie.Plot
        : "No description available";

    popup.style.display = "flex";
}


// ================= ERROR =================
export function showError(message) {
    favoritesContainer.innerHTML = "";
    recentContainer.innerHTML = "";
    moviesContainer.innerHTML = "";

    const error = document.createElement("p");
    error.className = "noResults";
    error.textContent = `😢 ${message}`;

    moviesContainer.appendChild(error);
}


// ================= FAVORITES =================
export function renderFavorites(favorites) {
    moviesContainer.innerHTML = "";
    recentContainer.innerHTML = "";
    favoritesContainer.innerHTML = "";

    if (!favorites || favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="empty-state">
                <h3>❤️ No Favorite Movies Yet</h3>
                <p>Click the Favorite button on movies</p>
            </div>
        `;
        return;
    }

    const title = document.createElement("h2");
    title.textContent = "❤️ Favorite Movies";
    favoritesContainer.appendChild(title);

    favorites.forEach(movie => {
        const p = document.createElement("p");
        p.textContent = `🎬 ${movie.Title}`;
        favoritesContainer.appendChild(p);
    });
}


// ================= RECENT =================
export function renderRecent(recent) {
    moviesContainer.innerHTML = "";
    favoritesContainer.innerHTML = "";
    recentContainer.innerHTML = "";

    if (!recent || recent.length === 0) {
        recentContainer.innerHTML = `
            <div class="empty-state">
                <h3>🕒 No Recently Viewed Movies</h3>
                <p>Open a movie to see it here</p>
            </div>
        `;
        return;
    }

    const title = document.createElement("h2");
    title.textContent = "🕒 Recently Viewed";
    recentContainer.appendChild(title);

    recent.forEach(movie => {
        const p = document.createElement("p");
        p.textContent = `👁️ ${movie.Title}`;
        recentContainer.appendChild(p);
    });
}
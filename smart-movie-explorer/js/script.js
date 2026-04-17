const API_KEY = "your_api_key_here"; // OMDB API key
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("moviesContainer");
searchBtn.addEventListener("click", searchMovies);
async function searchMovies() {
    let query = searchInput.value.trim();
    if (!query) {
        alert("Enter movie name");
        return;
    }
    let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
    let res = await fetch(url);
    let data = await res.json();
    displayMovies(data.Search);
}
function displayMovies(movies) {
    moviesContainer.innerHTML = "";
    if (!movies) {
        moviesContainer.innerHTML = "<p>No movies found 😢</p>";
        return;
    }
    movies.forEach(movie => {
        let poster = movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Image";

        let card = document.createElement("div");
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

async function showDetails(id) {
    let url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`;

    let res = await fetch(url);
    let movie = await res.json();

    showPopup(movie);
}

function showPopup(movie) {
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.style.display = "flex";

    modal.innerHTML = `
        <div class="modalContent">
            <span class="closeBtn">&times;</span>
            <h2>${movie.Title}</h2>
            <p><b>Year:</b> ${movie.Year}</p>
            <p><b>Genre:</b> ${movie.Genre}</p>
            <p><b>Plot:</b> ${movie.Plot}</p>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".closeBtn").addEventListener("click", () => {
        modal.remove();
    });
}
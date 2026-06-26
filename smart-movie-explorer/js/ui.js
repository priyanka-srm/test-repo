import { state } from "./state.js";
import { saveFavorite } from "./storage.js";
const moviesContainer = document.getElementById("moviesContainer");
const NO_POSTER = "https://placehold.co/300x450";
export function showLoader(){
    moviesContainer.innerHTML = "";
    const loader =  document.createElement("P");
    loader.className = "loader";
    loader.textContent = "Loading...";
    moviesContainer.appendChild(loader);
}
export function renderMovies(){
    moviesContainer.innerHTML = "";
    state.movies.forEach(movie=>{
        const card = document.createElement("div");
        card.className = "movieCard";
        const img = document.createElement("img");
        img.src = movie.Poster !== "N/A" ? movie.Poster : NO_POSTER;
        img.alt = movie.Title;
        img.onerror = ()=>{
            img.src = NO_POSTER;
        };
        const info = document.createElement("div");
        info.className="movieInfo";
        const title = document.createElement("h3");
        title.textContent = movie.Title;
        info.appendChild(title);
        const favBtn = document.createElement("Button");
        favBtn.textContent = "❤️ Favourite";
        favBtn.className = "favBtn";
        favBtn.onclick = (event)=>{
            event.stopPropagation();
            saveFavorite(movie);
        };
        info.appendChild(favBtn);
        card.appendChild(img);
        card.appendChild(info);
        card.addEventListener("click",()=>{
            document.dispatchEvent(new CustomEvent("showMovieDetails",{
                detail: movie.imdbID
        })
    );
});
        moviesContainer.appendChild(card);   
    });
}
export function showDetailsPopup(movie){
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const popupTitle = document.getElementById("popup-title");
    const popupDesc = document.getElementById("popup-desc");
    popupImg.src = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : NO_POSTER;
    popupTitle.textContent = movie.Title;
    popupDesc.textContent = movie.Plot && movie.Plot !== "N/A" ? movie.Plot : "No description available";
    popup.style.display = "flex";
}
export function showError(message){
    moviesContainer.innerHTML = "";
    const error = document.createElement("p");
    error.className = "noResults";
    error.textContent = `😢 ${message}`;
    moviesContainer.appendChild(error);
}
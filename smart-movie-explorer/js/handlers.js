import {fetchMovies, fetchMovieDetails} from "./api.js";
import {state, setState} from "./state.js";
import {showLoader, renderMovies, showError, showDetailsPopup} from "./ui.js";
import { saveRecentlyViewed } from "./storage.js";
export async function handleSearch(query) {
    if(!query) {
        return;
    }
    setState({
        query: query, loading: true, error: null
    });
    showLoader();
    try {
        const data = await fetchMovies(query);
        if(data.Response === "True") {
            setState({
                movies: data.Search, loading: false, error: null
            });
            renderMovies();
        }
        else {
            setState({
                movies:[], loading: false, error: data.Error
            });
            showError(data.Error);
        }
    }
    catch(error){
        if(error.name === "AbortError"){
            return;
        }
        setState({
            movies:[], loading: false, error: error.message
        });
        showError(error.message);
    }
}
export async function handleMovieDetails(id){
    try{
        const movie = await fetchMovieDetails(id);
        saveRecentlyViewed(movie);
        showDetailsPopup(movie);
    }
    catch(error){
        showError("Could not load movie details");
    }
}
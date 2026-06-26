import { CONFIG } from "./config.js";
let controller;
export async function fetchMovies(query) {
    if(controller){
        controller.abort();
    }
    controller = new AbortController();
    const response = await fetch(`https://www.omdbapi.com/?apikey=${CONFIG.API_KEY}&s=${query}`,{
        signal: controller.signal
    });
    if(!response.ok){
        throw new Error("Network Error");
    }
    return await response.json();
}
export async function fetchMovieDetails(id) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${CONFIG.API_KEY}&i=${id}`);
    if(!response.ok) {
        throw new Error("Network Error");
    }
    return await response.json();
}
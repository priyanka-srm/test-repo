
import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const FAVORITES_KEY = "smart-movie-explorer-favorites";

function loadFavorites() {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    const parsedFavorites = savedFavorites
      ? JSON.parse(savedFavorites)
      : [];

    return Array.isArray(parsedFavorites) ? parsedFavorites : [];
  } catch {
    return [];
  }
}


function MoviePoster({ src, title, className = "movie-poster" }) {
  const [failedSrc, setFailedSrc] = useState("");

  const isModalPoster = className === "modal-poster";
  const imageFailed = failedSrc === src;

  if (!src || src === "N/A" || imageFailed) {
    return (
      <div
        className={
          isModalPoster
            ? "poster-placeholder modal-poster"
            : "poster-placeholder"
        }
        role="img"
        aria-label={`Poster unavailable for ${title}`}
      >
        <span aria-hidden="true">🎞️</span>
        <span>Poster unavailable</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={`${title} poster`}
      loading="lazy"
      onError={() => setFailedSrc(src)}
    />
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [favorites, setFavorites] = useState(loadFavorites);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const searchControllerRef = useRef(null);
  const detailsControllerRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      // Favorites remain available in React state if storage is unavailable.
    }
  }, [favorites]);

  const closeDetails = useCallback(() => {
    detailsControllerRef.current?.abort();
    detailsControllerRef.current = null;

    setSelectedMovie(null);
    setMovieDetails(null);
    setDetailsError("");
    setDetailsLoading(false);
  }, []);

  useEffect(() => {
    if (!selectedMovie) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeDetails();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMovie, closeDetails]);

  function isFavorite(movieId) {
    return favorites.some((movie) => movie.imdbID === movieId);
  }

  function toggleFavorite(movie) {
    setFavorites((currentFavorites) => {
      const alreadySaved = currentFavorites.some(
        (favorite) => favorite.imdbID === movie.imdbID,
      );

      if (alreadySaved) {
        return currentFavorites.filter(
          (favorite) => favorite.imdbID !== movie.imdbID,
        );
      }

      return [...currentFavorites, movie];
    });
  }

  async function handleSearch(event) {
    event.preventDefault();

    const searchTerm = query.trim();

    if (!searchTerm) {
      searchControllerRef.current?.abort();
      setLoading(false);
      setError("Please enter a movie name to search.");
      setMovies([]);
      setHasSearched(true);
      return;
    }

    if (!API_KEY) {
      setError(
        "OMDb API key is missing. Add VITE_OMDB_API_KEY to your .env.local file and restart the development server.",
      );
      setMovies([]);
      setHasSearched(true);
      return;
    }

    // Allow searches such as "Dragon 2025" to include a release year.
    const yearMatch = searchTerm.match(/\b(19\d{2}|20\d{2})\b/);
    const year = yearMatch?.[0];
    const title = year
      ? searchTerm.replace(yearMatch[0], "").trim()
      : searchTerm;

    if (!title) {
      setError("Please enter a movie title along with the year.");
      setMovies([]);
      setHasSearched(true);
      return;
    }

    searchControllerRef.current?.abort();

    const controller = new AbortController();
    searchControllerRef.current = controller;

    setLoading(true);
    setError("");
    setMovies([]);
    setHasSearched(true);

    try {
      const params = new URLSearchParams({
        apikey: API_KEY,
        s: title,
        type: "movie",
      });

      if (year) {
        params.set("y", year);
      }

      const response = await fetch(
        `https://www.omdbapi.com/?${params.toString()}`,
        { signal: controller.signal },
      );

      if (!response.ok) {
        throw new Error(
          "Unable to connect to the movie service. Please try again.",
        );
      }

      const data = await response.json();

      if (data.Response === "False") {
        if (data.Error === "Invalid API key!") {
          throw new Error(
            "The OMDb API key is invalid. Please check your .env.local file.",
          );
        }

        if (data.Error?.toLowerCase().includes("limit")) {
          throw new Error(
            "The OMDb daily request limit may have been reached. Please try again later.",
          );
        }

        setMovies([]);
        setError(
          `No results found for "${searchTerm}" in OMDb. Try the movie's English title or add its release year. Some Tamil movies may not be listed in this database.`,
        );
        return;
      }

      setMovies(Array.isArray(data.Search) ? data.Search : []);
    } catch (err) {
      if (err.name !== "AbortError") {
        setMovies([]);
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }

  async function handleMovieClick(movie) {
    detailsControllerRef.current?.abort();

    const controller = new AbortController();
    detailsControllerRef.current = controller;

    setSelectedMovie(movie);
    setMovieDetails(null);
    setDetailsError("");
    setDetailsLoading(true);

    if (!API_KEY) {
      setDetailsError(
        "OMDb API key is missing. Configure your .env.local file first.",
      );
      setDetailsLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams({
        apikey: API_KEY,
        i: movie.imdbID,
        plot: "full",
      });

      const response = await fetch(
        `https://www.omdbapi.com/?${params.toString()}`,
        { signal: controller.signal },
      );

      if (!response.ok) {
        throw new Error("Unable to load movie details. Please try again.");
      }

      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error || "Could not load movie details.");
      }

      setMovieDetails(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setDetailsError(
          err.message || "Something went wrong while loading movie details.",
        );
      }
    } finally {
      if (!controller.signal.aborted) {
        setDetailsLoading(false);
      }
    }
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closeDetails();
    }
  }

  function renderMovieCard(movie) {
    const saved = isFavorite(movie.imdbID);

    return (
      <article className="movie-card-wrapper" key={movie.imdbID}>
        <button
          className="movie-card movie-card-button"
          type="button"
          onClick={() => handleMovieClick(movie)}
          aria-label={`View details for ${movie.Title}`}
        >
          <MoviePoster src={movie.Poster} title={movie.Title} />

          <div className="movie-info">
            <h3>{movie.Title}</h3>
            <p>{movie.Year || "Year unavailable"}</p>
            <span className="movie-card-link">View details →</span>
          </div>
        </button>

        <button
          className={`favorite-button${saved ? " is-favorite" : ""}`}
          type="button"
          onClick={() => toggleFavorite(movie)}
          aria-pressed={saved}
          aria-label={
            saved
              ? `Remove ${movie.Title} from favorites`
              : `Add ${movie.Title} to favorites`
          }
        >
          <span aria-hidden="true">{saved ? "♥" : "♡"}</span>
          {saved ? "Remove favorite" : "Add to favorites"}
        </button>
      </article>
    );
  }

  return (
    <div className="app">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Smart Movie Explorer home">
          <span className="brand-icon" aria-hidden="true">
            🎬
          </span>
          <span>Smart Movie Explorer</span>
        </a>

        <span className="header-label">DISCOVER YOUR NEXT MOVIE</span>
      </header>

      <main className="main-content">
        <section className="hero">
          <p className="eyebrow">YOUR PERSONAL MOVIE GUIDE</p>

          <h1>
            Find your next
            <br />
            <span>favorite movie.</span>
          </h1>

          <p className="hero-description">
            Explore movies, discover their stories, and find something worth
            watching.
          </p>

          <form className="search-form" onSubmit={handleSearch}>
            <label className="sr-only" htmlFor="movie-search">
              Search for a movie
            </label>

            <input
              id="movie-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a movie, e.g. Interstellar or Dragon 2025..."
              autoComplete="off"
            />

            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search movies"}
            </button>
          </form>

          <p className="search-hint">
            Try a movie title such as Inception, Interstellar, or a title with
            its release year.
          </p>
        </section>

        <section className="results-section" aria-live="polite">
          {loading && (
            <p className="status-message">Finding movies for you...</p>
          )}

          {!loading && error && (
            <div className="status-message error-message" role="alert">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && hasSearched && movies.length > 0 && (
            <>
              <div className="section-heading">
                <div>
                  <p className="eyebrow">SEARCH RESULTS</p>
                  <h2>Movies you might love</h2>
                </div>

                <span className="result-count">
                  {movies.length} {movies.length === 1 ? "movie" : "movies"}
                </span>
              </div>

              <div className="movie-grid">
                {movies.map(renderMovieCard)}
              </div>
            </>
          )}

          {!loading && !error && hasSearched && movies.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">
                🍿
              </span>
              <h2>No movies to show</h2>
              <p>Try searching for another movie title.</p>
            </div>
          )}

          {!loading && !error && !hasSearched && (
            <div className="empty-state welcome-state">
              <span className="empty-icon" aria-hidden="true">
                ✨
              </span>
              <h2>Your next movie adventure starts here</h2>
              <p>Search for a movie to explore its details.</p>
            </div>
          )}
        </section>

        <section className="favorites-section" aria-labelledby="favorites-title">
          <p className="eyebrow">YOUR COLLECTION</p>

          <div className="section-heading">
            <div>
              <h2 id="favorites-title">Favorites ❤️</h2>
              <p>Your personally saved movie collection.</p>
            </div>

            <span className="result-count">{favorites.length} saved</span>
          </div>

          {favorites.length > 0 ? (
            <div className="movie-grid">
              {favorites.map(renderMovieCard)}
            </div>
          ) : (
            <div className="empty-state favorites-empty-state">
              <span className="empty-icon" aria-hidden="true">
                ♡
              </span>
              <h3>No favorites yet</h3>
              <p>
                Search for movies and select “Add to favorites” to save them
                here.
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <p>Made with curiosity and a love for movies.</p>
        <p>Smart Movie Explorer</p>
      </footer>

      {selectedMovie && (
        <div
          className="modal-backdrop"
          onMouseDown={handleBackdropClick}
          role="presentation"
        >
          <section
            className="movie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby={
              movieDetails ? "modal-description" : undefined
            }
          >
            <button
              className="modal-close"
              type="button"
              onClick={closeDetails}
              ref={closeButtonRef}
              aria-label="Close movie details"
            >
              ×
            </button>

            {detailsLoading && (
              <div className="modal-status">
                <p>Loading movie details...</p>
              </div>
            )}

            {!detailsLoading && detailsError && (
              <div className="modal-status error-message" role="alert">
                <h2 id="modal-title">Unable to load details</h2>
                <p>{detailsError}</p>
                <button type="button" onClick={closeDetails}>
                  Close
                </button>
              </div>
            )}

            {!detailsLoading && movieDetails && (
              <div className="modal-content">
                <div className="modal-poster-container">
                  <MoviePoster
                    src={movieDetails.Poster}
                    title={movieDetails.Title}
                    className="modal-poster"
                  />
                </div>

                <div className="modal-details">
                  <p className="eyebrow">MOVIE DETAILS</p>
                  <h2 id="modal-title">{movieDetails.Title}</h2>

                  <div className="modal-meta">
                    {movieDetails.Year && <span>{movieDetails.Year}</span>}
                    {movieDetails.Rated &&
                      movieDetails.Rated !== "N/A" && (
                        <span>{movieDetails.Rated}</span>
                      )}
                    {movieDetails.Runtime &&
                      movieDetails.Runtime !== "N/A" && (
                        <span>{movieDetails.Runtime}</span>
                      )}
                  </div>

                  {movieDetails.imdbRating &&
                    movieDetails.imdbRating !== "N/A" && (
                      <p className="imdb-rating">
                        ⭐ IMDb {movieDetails.imdbRating}/10
                      </p>
                    )}

                  <h3>Story</h3>
                  <p id="modal-description" className="modal-plot">
                    {movieDetails.Plot && movieDetails.Plot !== "N/A"
                      ? movieDetails.Plot
                      : "No plot description is available."}
                  </p>

                  <div className="detail-list">
                    {movieDetails.Genre &&
                      movieDetails.Genre !== "N/A" && (
                        <p>
                          <strong>Genre:</strong> {movieDetails.Genre}
                        </p>
                      )}

                    {movieDetails.Director &&
                      movieDetails.Director !== "N/A" && (
                        <p>
                          <strong>Director:</strong> {movieDetails.Director}
                        </p>
                      )}

                    {movieDetails.Actors &&
                      movieDetails.Actors !== "N/A" && (
                        <p>
                          <strong>Cast:</strong> {movieDetails.Actors}
                        </p>
                      )}
                  </div>

                  {movieDetails.imdbID && (
                    <a
                      className="imdb-link"
                      href={`https://www.imdb.com/title/${encodeURIComponent(
                        movieDetails.imdbID,
                      )}/`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on IMDb ↗
                    </a>
                  )}

                  <button
                    className={`favorite-button modal-favorite-button${
                      isFavorite(movieDetails.imdbID) ? " is-favorite" : ""
                    }`}
                    type="button"
                    onClick={() => toggleFavorite(movieDetails)}
                    aria-pressed={isFavorite(movieDetails.imdbID)}
                  >
                    <span aria-hidden="true">
                      {isFavorite(movieDetails.imdbID) ? "♥" : "♡"}
                    </span>
                    {isFavorite(movieDetails.imdbID)
                      ? "Remove from favorites"
                      : "Add to favorites"}
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default App;

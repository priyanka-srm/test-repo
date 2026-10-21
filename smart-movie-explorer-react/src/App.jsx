
import { useEffect, useRef, useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const searchControllerRef = useRef(null);
  const detailsControllerRef = useRef(null);
  const closeButtonRef = useRef(null);

  function closeDetails() {
    detailsControllerRef.current?.abort();
    detailsControllerRef.current = null;

    setSelectedMovie(null);
    setMovieDetails(null);
    setDetailsError("");
    setDetailsLoading(false);
  }

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
  }, [selectedMovie]);

  async function handleSearch(event) {
    event.preventDefault();

    const searchTerm = query.trim();

    if (!searchTerm) {
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
        s: searchTerm,
        type: "movie",
      });

      const response = await fetch(
        `https://www.omdbapi.com/?${params.toString()}`,
        { signal: controller.signal },
      );

      if (!response.ok) {
        throw new Error("Unable to connect to the movie service.");
      }

      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error || "No movies found. Try another title.");
      }

      setMovies(data.Search || []);
    } catch (err) {
      if (err.name !== "AbortError") {
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
        throw new Error("Unable to load movie details.");
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
              placeholder="Search a movie, e.g. Interstellar..."
              autoComplete="off"
            />

            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search movies"}
            </button>
          </form>

          <p className="search-hint">
            Try a title like Inception, Interstellar, or The Dark Knight.
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
                {movies.map((movie) => (
                  <button
                    className="movie-card movie-card-button"
                    key={movie.imdbID}
                    type="button"
                    onClick={() => handleMovieClick(movie)}
                    aria-label={`View details for ${movie.Title}`}
                  >
                    {movie.Poster && movie.Poster !== "N/A" ? (
                      <img
                        className="movie-poster"
                        src={movie.Poster}
                        alt={`${movie.Title} poster`}
                        loading="lazy"
                      />
                    ) : (
                      <div className="poster-placeholder">
                        <span aria-hidden="true">🎞️</span>
                        <span>Poster unavailable</span>
                      </div>
                    )}

                    <div className="movie-info">
                      <h3>{movie.Title}</h3>
                      <p>{movie.Year || "Year unavailable"}</p>
                      <span className="movie-card-link">View details →</span>
                    </div>
                  </button>
                ))}
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

        <section className="favorites-section">
          <p className="eyebrow">YOUR COLLECTION</p>
          <h2>Favorites</h2>
          <p>
            Your favorite movies collection is coming soon. Stay tuned!
          </p>
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
                  {movieDetails.Poster &&
                  movieDetails.Poster !== "N/A" ? (
                    <img
                      className="modal-poster"
                      src={movieDetails.Poster}
                      alt={`${movieDetails.Title} poster`}
                    />
                  ) : (
                    <div className="poster-placeholder modal-poster">
                      <span aria-hidden="true">🎞️</span>
                      <span>Poster unavailable</span>
                    </div>
                  )}
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
                    {movieDetails.Plot &&
                    movieDetails.Plot !== "N/A"
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

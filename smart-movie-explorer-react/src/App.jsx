
import { useRef, useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const controllerRef = useRef(null);

  async function handleSearch(event) {
    event.preventDefault();

    const searchTerm = query.trim();

    if (!searchTerm) {
      setError("Please enter a movie title to search.");
      setMovies([]);
      setHasSearched(false);
      return;
    }

    if (!API_KEY) {
      setError(
        "OMDb API key is missing. Add VITE_OMDB_API_KEY to .env.local and restart the development server."
      );
      setMovies([]);
      setHasSearched(false);
      return;
    }

    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError("");
    setHasSearched(true);
    setMovies([]);

    try {
      const params = new URLSearchParams({
        apikey: API_KEY,
        s: searchTerm,
        type: "movie",
      });

      const response = await fetch(
        `https://www.omdbapi.com/?${params.toString()}`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Unable to contact the movie service. Please try again.");
      }

      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error || "No movies found.");
      }

      setMovies(data.Search ?? []);
    } catch (err) {
      if (err.name === "AbortError") {
        return;
      }

      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <a className="brand" href="#discover" aria-label="Movie Explorer home">
          <span className="brand-icon" aria-hidden="true">🎬</span>
          <span>
            Movie<span className="brand-highlight">Explorer</span>
          </span>
        </a>

        <nav className="header-nav" aria-label="Main navigation">
          <a href="#discover">Discover</a>
          <a href="#favorites">Favorites</a>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="discover">
          <p className="eyebrow">YOUR NEXT FAVORITE MOVIE STARTS HERE</p>
          <h1>
            Find your next <span>favorite film.</span>
          </h1>
          <p className="hero-description">
            Explore movies, discover hidden gems, and find your next watch.
          </p>

          <form className="search-form" onSubmit={handleSearch}>
            <label className="sr-only" htmlFor="movie-search">
              Search movies by title
            </label>
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              id="movie-search"
              name="movieSearch"
              type="search"
              placeholder="Search for a movie..."
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </section>

        <section className="movies-section" aria-labelledby="movies-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EXPLORE THE COLLECTION</p>
              <h2 id="movies-heading">
                {hasSearched ? "Search results" : "Discover movies"}
              </h2>
            </div>
            {movies.length > 0 && (
              <span className="coming-soon">
                {movies.length} movies found
              </span>
            )}
          </div>

          {loading && (
            <p className="status-message" role="status">
              Searching for movies...
            </p>
          )}

          {!loading && error && (
            <div className="empty-state" role="alert">
              <span className="empty-icon" aria-hidden="true">⚠️</span>
              <h3>Unable to load movies</h3>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && movies.length > 0 && (
            <div className="movie-grid">
              {movies.map((movie) => (
                <article className="movie-card" key={movie.imdbID}>
                  {movie.Poster && movie.Poster !== "N/A" ? (
                    <img
                      className="movie-poster"
                      src={movie.Poster}
                      alt={`${movie.Title} poster`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="poster-placeholder">
                      <span aria-hidden="true">🎬</span>
                      <span>No poster available</span>
                    </div>
                  )}

                  <div className="movie-info">
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year || "Year unavailable"}</p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && !error && movies.length === 0 && !hasSearched && (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">🍿</span>
              <h3>Your movie adventure starts here</h3>
              <p>Enter a movie title above to discover movies.</p>
            </div>
          )}
        </section>

        <section
          className="movies-section"
          id="favorites"
          aria-labelledby="favorites-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
              <h2 id="favorites-heading">Your favorites</h2>
            </div>
          </div>
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">♥</span>
            <h3>Your watchlist starts here</h3>
            <p>Favorite movie functionality is coming in the next phase.</p>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Made for movie lovers <span aria-hidden="true">♥</span>
        </p>
      </footer>
    </div>
  );
}

export default App;

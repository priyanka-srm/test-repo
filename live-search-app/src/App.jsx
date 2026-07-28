import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import "./App.css";
function App() {
  const [query, setQuery] = useState("");
  return (
    <div className="app">
      <div className="container">
        <h1>Live Search App</h1>
        <SearchBar setQuery={setQuery} />
        <SearchResults query={query} category="All" />
      </div>
    </div>
  );
}
export default App;

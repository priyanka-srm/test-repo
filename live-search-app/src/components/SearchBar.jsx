import { useEffect, useRef } from "react";
import CustomInput from "./CustomInput";
function SearchBar({ query, setQuery }) {
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  function handleChange(e) {
    const value = e.target.value;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setQuery(value);
    }, 500);
  }
  return (
    <div>
      <CustomInput ref={inputRef} value={query} onChange={handleChange} />
    </div>
  );
}
export default SearchBar;

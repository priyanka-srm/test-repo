import { useState, useEffect, useRef } from "react";
import CustomInput from "./CustomInput";
function SearchBar({ setQuery }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  // Auto focus when component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  // Cleanup pending debounce timer on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);
  function handleChange(e) {
    const value = e.target.value;
    // Update input immediately
    setText(value);
    // Debounce search
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setQuery(value);
    }, 500);
  }
  return (
    <div>
      <CustomInput
        ref={inputRef}
        value={text}
        onChange={handleChange}
        placeholder="Search users..." />
    </div>
  );
}
export default SearchBar;

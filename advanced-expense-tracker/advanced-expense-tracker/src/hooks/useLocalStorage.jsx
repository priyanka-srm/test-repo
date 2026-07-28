import { useState } from "react";
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
      return initialValue;
    } catch (error) {
      console.error("LocalStorage Read Error:", error);
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      setStoredValue(value);
      localStorage.setItem(
        key,
        JSON.stringify(value),
      );
    } catch (error) {
      console.error("LocalStorage Save Error:", error);
    }
  };
  return [storedValue, setValue];
}
export default useLocalStorage;

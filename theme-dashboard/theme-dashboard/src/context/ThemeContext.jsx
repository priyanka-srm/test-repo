import { createContext, useState } from "react";
export const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }
  const value = {
    theme,
    toggleTheme,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

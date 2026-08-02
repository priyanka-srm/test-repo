import { useTheme } from "../hooks/useTheme";
function Settings() {
  const { theme, toggleTheme } = useTheme();
  return (
    <section className={`settings ${theme}`}>
      <h2>⚙️ Settings</h2>
      <p>Current Theme: {theme.toUpperCase()}</p>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </section>
  );
}
export default Settings;

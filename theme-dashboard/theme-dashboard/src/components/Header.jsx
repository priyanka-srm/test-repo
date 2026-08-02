import { useTheme } from "../hooks/useTheme";
function Header() {
  const { theme } = useTheme();
  return (
    <header className={`header ${theme}`}>
      <h1>🌗 Theme Dashboard</h1>
      <p>Current Theme: {theme.toUpperCase()}</p>
    </header>
  );
}
export default Header;

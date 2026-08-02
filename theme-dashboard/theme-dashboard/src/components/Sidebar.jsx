import { useTheme } from "../hooks/useTheme";
function Sidebar() {
  const { theme } = useTheme();
  return (
    <aside className={`sidebar ${theme}`}>
      <h2>📋 Sidebar</h2>
      <ul>
        <li>🏠 Home</li>
        <li>👤 Profile</li>
        <li>⚙️ Settings</li>
        <li>📞 Contact</li>
      </ul>
      <p>Theme: {theme}</p>
    </aside>
  );
}
export default Sidebar;

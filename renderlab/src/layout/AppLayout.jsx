import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
const navItems = [
  { to: "/", label: "Overview", end: true },
  { to: "/rerender", label: "Re-renders" },
  { to: "/memo", label: "React.memo" },
  { to: "/callback", label: "useMemo / Callback" },
  { to: "/lazy", label: "Code Splitting" },
  { to: "/virtualization", label: "Virtualization" },
  { to: "/profiler", label: "Profiler" },
];
export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);
  function handleNavigation() {
    setMenuOpen(false);
  }
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <NavLink
            to="/"
            className="brand"
            aria-label="RenderLab home"
            onClick={handleNavigation}>
            <span className="brand-mark" aria-hidden="true">
              RL
            </span>
            <span>
              <strong>RenderLab</strong>
              <small>React Performance Lab</small>
            </span>
          </NavLink>
          <button
            type="button"
            className="mobile-menu-button"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((current) => !current)}>
            <span className="sr-only">
              {menuOpen ? "Close navigation" : "Open navigation"}
            </span>
            <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
          </button>
          <nav
            id="main-navigation"
            className={`main-navigation ${
              menuOpen ? "main-navigation-open" : ""
            }`}
            aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div>
          <strong>RenderLab</strong>
          <span>Performance concepts you can actually observe.</span>
        </div>
        <span>Phase 14 · React Performance Optimization</span>
      </footer>
    </div>
  );
}

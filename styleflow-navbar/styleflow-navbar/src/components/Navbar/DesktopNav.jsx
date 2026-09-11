import clsx from "clsx";
import ThemeIndicator from "../ThemeIndicator/ThemeIndicator";
import styles from "./Navbar.module.css";
function SunIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true">
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" />
    </svg>
  );
}
function DesktopNav({ items, activeId, theme, onNavigate, onToggleTheme }) {
  return (
    <div className={styles.desktopArea}>
      <nav className={styles.navigation} aria-label="Primary navigation">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={clsx(
              styles.navLink,
              activeId === item.id && styles.active,
              item.disabled && styles.disabled,
            )}
            aria-current={activeId === item.id ? "page" : undefined}
            aria-disabled={item.disabled || undefined}
            onClick={(event) => {
              if (item.disabled) {
                event.preventDefault();
                return;
              }
              onNavigate(item.id);
            }}>
            {item.label}
          </a>
        ))}
      </nav>
      <ThemeIndicator theme={theme} />
      <button
        type="button"
        className={styles.themeButton}
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
        {theme === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
}
export default DesktopNav;

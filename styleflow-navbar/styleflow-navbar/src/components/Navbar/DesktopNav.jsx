import clsx from "clsx";
import ThemeIndicator from "../ThemeIndicator/ThemeIndicator";
import styles from "./Navbar.module.css";
function DesktopNav({ items, theme, activeId, onNavigate, onToggleTheme }) {
  const handleNavClick = (event, item) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    onNavigate(item.id);
  };
  return (
    <div className={styles.desktopArea}>
      <a href="#home" className={styles.brand} aria-label="StyleFlow home">
        <span className={styles.brandMark} aria-hidden="true">
          SF
        </span>
        <span className={styles.brandText}>
          <span className={styles.brandName}>StyleFlow</span>
          <span className={styles.brandCaption}>React Practice</span>
        </span>
      </a>
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
            aria-current={
              activeId === item.id && !item.disabled ? "page" : undefined
            }
            aria-disabled={item.disabled ? "true" : undefined}
            onClick={(event) => handleNavClick(event, item)}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className={styles.actions}>
        <ThemeIndicator theme={theme} />
        <button
          type="button"
          className={styles.themeButton}
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
}
export default DesktopNav;

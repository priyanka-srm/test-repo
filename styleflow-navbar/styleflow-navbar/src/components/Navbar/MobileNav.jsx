import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import ThemeIndicator from "../ThemeIndicator/ThemeIndicator";
import styles from "./Navbar.module.css";
function MenuIcon({ isOpen }) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true">
      {isOpen ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </>
      )}
    </svg>
  );
}
function MobileNav({ items, activeId, theme, onNavigate, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeMenu = () => {
    setIsOpen(false);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };
  const handleNavigate = (id) => {
    onNavigate(id);
    closeMenu();
  };
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
  return (
    <div className={styles.mobileWrapper}>
      <div className={styles.mobileHeader}>
        <span className={styles.brand}>
          <span className={styles.brandMark}>SF</span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>StyleFlow</span>
          </span>
        </span>
        <div className={styles.mobileActions}>
          <ThemeIndicator theme={theme} />
          <button
            ref={triggerRef}
            type="button"
            className={styles.menuButton}
            onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            aria-controls="mobile-navigation">
            <MenuIcon isOpen={isOpen} />
          </button>
        </div>
      </div>
      {isOpen && (
        <div id="mobile-navigation" className={styles.mobilePanel}>
          <nav
            className={styles.mobileNavigation}
            aria-label="Mobile primary navigation">
            {items.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={clsx(
                  styles.mobileNavLink,
                  activeId === item.id && styles.mobileActive,
                  item.disabled && styles.mobileDisabled,
                )}
                aria-current={activeId === item.id ? "page" : undefined}
                aria-disabled={item.disabled || undefined}
                onClick={(event) => {
                  if (item.disabled) {
                    event.preventDefault();
                    return;
                  }
                  handleNavigate(item.id);
                }}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className={styles.mobileTheme}>
            <span className={styles.mobileThemeLabel}>Appearance</span>
            <button
              type="button"
              className={styles.themeButton}
              onClick={onToggleTheme}
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } mode`}>
              {theme === "light" ? "Dark mode" : "Light mode"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default MobileNav;

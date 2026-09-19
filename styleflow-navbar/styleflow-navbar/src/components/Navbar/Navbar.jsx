import { useEffect, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { navigationItems } from "../../data/navigation";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import styles from "./Navbar.module.css";
const THEME_STORAGE_KEY = "styleflow-theme";
function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
  } catch {
    // Ignore localStorage errors.
  }
  return "light";
}
function getInitialActiveId() {
  if (typeof window === "undefined") {
    return "home";
  }
  const currentHash = window.location.hash.replace("#", "");
  const matchingItem = navigationItems.find((item) => item.id === currentHash);
  return matchingItem ? matchingItem.id : "home";
}
function Navbar() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeId, setActiveId] = useState(getInitialActiveId);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore localStorage errors.
    }
  }, [theme]);
  useEffect(() => {
    const handleHashChange = () => {
      const hashId = window.location.hash.replace("#", "");
      const matchingItem = navigationItems.find((item) => item.id === hashId);
      setActiveId(matchingItem ? matchingItem.id : "home");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  const handleThemeToggle = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };
  const handleNavigate = (id) => {
    setActiveId(id);
  };
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        {isDesktop ? (
          <DesktopNav
            items={navigationItems}
            theme={theme}
            activeId={activeId}
            onNavigate={handleNavigate}
            onToggleTheme={handleThemeToggle}/>
        ) : (
          <MobileNav
            items={navigationItems}
            theme={theme}
            activeId={activeId}
            onNavigate={handleNavigate}
            onToggleTheme={handleThemeToggle}/>
        )}
      </div>
    </header>
  );
}
export default Navbar;

import styles from "./ThemeIndicator.module.css";
function ThemeIndicator({ theme }) {
  const isDark = theme === "dark";
  const indicatorStyle = {
    "--indicator-color": isDark ? "#a5b4fc" : "#3730a3",
  };
  return (
    <span
      className={styles.indicator}
      style={indicatorStyle}
      aria-label={`Current theme: ${theme}`}>
      <span className={styles.dot} aria-hidden="true" />
      {isDark ? "Dark mode" : "Light mode"}
    </span>
  );
}
export default ThemeIndicator;

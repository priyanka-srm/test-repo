import { useTheme } from "../hooks/useTheme";
function ProfileCard() {
  const { theme } = useTheme();
  return (
    <section className={`profile-card ${theme}`}>
      <h2>👤 Profile Card</h2>
      <p>
        <strong>Name:</strong> Priyanka
      </p>
      <p>
        <strong>Role:</strong> Frontend Developer
      </p>
      <p>
        <strong>Current Theme:</strong> {theme.toUpperCase()}
      </p>
    </section>
  );
}
export default ProfileCard;

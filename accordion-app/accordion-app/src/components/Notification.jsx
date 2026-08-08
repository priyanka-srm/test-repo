function Notification({ message, type }) {
  if (!message) {
    return null;
  }
  return (
    <div
      className={`notification ${type === "warning" ? "warning" : "success"}`}>
      {type === "warning" ? "⚠️" : "✅"} {message}
    </div>
  );
}
export default Notification;

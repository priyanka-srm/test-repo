import "./App.css";
import avatar from "./assets/hero.png";
function App() {
  const name = "Priyanka S";
  const role = "Frontend Developer";
  const isOnline = true;
  return (
    <div className="container">
      <div className="card">
        <img src={avatar} alt={`Photo of ${name}`} className="avatar"/>
        <h1>{name}</h1>
        <h2>{role}</h2>
        <p>{isOnline ? "🟢 Online" : "⚪ Offline"}</p>
        <p>Learning React Fundamentals.</p>
      </div>
    </div>
  );
}
export default App;

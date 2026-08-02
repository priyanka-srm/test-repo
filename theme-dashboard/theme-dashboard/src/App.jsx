import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProfileCard from "./components/ProfileCard";
import Settings from "./components/Settings";
function App() {
  return (
    <div className="app">
      <Header />
      <Sidebar />
      <ProfileCard />
      <Settings />
    </div>
  );
}
export default App;

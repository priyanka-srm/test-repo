import TeamList from "./components/TeamList";
import Card from "./components/Card";
function App() {
  const teamMembers = [
    {
      id: 1,
      name: "Priyanka",
      role: "Frontend Developer",
      avatar: "👩‍💻",
    },
    {
      id: 2,
      name: "Arun",
      role: "Backend Developer",
      avatar: "👨‍💻",
    },
    {
      id: 3,
      name: "Asha",
      role: "UI Designer",
      avatar: "🎨",
    },
  ];
  return (
    <>
      <div>
        <h1>Team Roster</h1>
        <TeamList members={teamMembers} />
      </div>
      <Card>
        <p>This card is using the default title.</p>
      </Card>
    </>
  );
}
export default App;

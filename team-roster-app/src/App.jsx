import TeamList from "./components/TeamList";
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
    <div>
      <h1>Team Roster</h1>
      <TeamList members={teamMembers} />
    </div>
  );
}
export default App;

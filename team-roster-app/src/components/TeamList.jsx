import TeamMember from "./TeamMember";
function TeamList({ members }) {
  return (
    <div className="team-list">
      {members.map((member) => (
        <TeamMember
          key={member.id}
          name={member.name} 
          role={member.role}>
          {member.avatar}
        </TeamMember>
      ))}
    </div>
  );
}
export default TeamList;
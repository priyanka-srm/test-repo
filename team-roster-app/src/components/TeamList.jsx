import PropTypes from "prop-types";
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
TeamList.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      avatar: PropTypes.node,
    })
  ).isRequired,
};
export default TeamList;
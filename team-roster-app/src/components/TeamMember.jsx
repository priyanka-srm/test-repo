import PropTypes from "prop-types";
import Card from "./Card";
function TeamMember({ name, role, children }) {
  return (
    <Card title="Team Member">
      <div className="avatar">{children}</div>
      <h2>{name}</h2>
      <p>{role}</p>
    </Card>
  );
}
TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default TeamMember;
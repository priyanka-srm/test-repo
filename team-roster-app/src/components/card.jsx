import PropTypes from "prop-types";
function Card({ title = "Untitled", children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};
export default Card;
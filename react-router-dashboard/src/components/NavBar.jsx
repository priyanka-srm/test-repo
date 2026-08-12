import { Link, NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <Link to="/">React Router Dashboard</Link>

      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
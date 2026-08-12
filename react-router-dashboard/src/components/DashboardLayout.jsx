import { Link, Outlet, useLocation } from "react-router-dom";
import "./DashboardLayout.css";

function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <span>⚡</span>
          RouterDash
        </div>

        <nav className="sidebar-nav">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            🏠 Dashboard
          </Link>

          <Link
            to="/about"
            className={location.pathname === "/about" ? "active" : ""}
          >
            ℹ️ About
          </Link>

          <Link
            to="/products"
            className={
              location.pathname.startsWith("/products") ? "active" : ""
            }
          >
            📦 Products
          </Link>

          <Link
            to="/users/101"
            className={location.pathname.startsWith("/users") ? "active" : ""}
          >
            👤 Users
          </Link>

          <Link
            to="/profile"
            className={location.pathname === "/profile" ? "active" : ""}
          >
            👨 Profile
          </Link>

          <Link
            to="/settings"
            className={location.pathname === "/settings" ? "active" : ""}
          >
            ⚙️ Settings
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <Link to="/login">🔐 Login</Link>
        </div>
      </aside>

      {/* Main Area */}
      <div className="main-area">
        <header className="topbar">
          <div>
            <h2>Dashboard</h2>
            <p>React Router Learning Project</p>
          </div>

          <div className="profile-mini">
            <div className="avatar">P</div>
            <div>
              <strong>Priya</strong>
              <small>Developer</small>
            </div>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;

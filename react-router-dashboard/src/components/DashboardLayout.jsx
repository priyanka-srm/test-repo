import { NavLink, Outlet } from "react-router-dom";
import "./DashboardLayout.css";

function DashboardLayout() {
  return (
    <div className="dashboard">
      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">
        {/* Logo */}
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">RouterDash</span>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Dashboard</span>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="nav-icon">ℹ️</span>
            <span className="nav-text">About</span>
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="nav-icon">📦</span>
            <span className="nav-text">Products</span>
          </NavLink>

          <NavLink
            to="/users/101"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="nav-icon">👤</span>
            <span className="nav-text">Users</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="nav-icon">👨</span>
            <span className="nav-text">Profile</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">Settings</span>
          </NavLink>
        </nav>

        {/* Login */}
        <div className="sidebar-bottom">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="nav-icon">🔐</span>
            <span className="nav-text">Login</span>
          </NavLink>
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}

      <div className="main-area">
        {/* Topbar */}
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

        {/* Page Content */}
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;

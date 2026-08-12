function Home() {
  return (
    <div>
      <div className="page-heading">
        <h1>Welcome back, Priya 👋</h1>
        <p>Here's what's happening in your React Router project.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <h3>8</h3>
          <p>Total Pages</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔗</div>
          <h3>6</h3>
          <p>Routes</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👤</div>
          <h3>3</h3>
          <p>Users</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <h3>3</h3>
          <p>Products</p>
        </div>
      </div>

      <div className="welcome-card">
        <h2>🚀 React Router Phase 9</h2>

        <p>
          You're learning routing, nested routes, dynamic routes, URL parameters
          and protected routes.
        </p>

        <div className="concepts">
          <span>Basic Routing</span>
          <span>Nested Routes</span>
          <span>Dynamic Routes</span>
          <span>useParams</span>
          <span>Protected Routes</span>
        </div>
      </div>
    </div>
  );
}

export default Home;

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">REACT TESTING LAB</p>
          <h1>TestFlow</h1>
        </div>

        <span className="status-badge">Testing Mode</span>
      </header>

      <main className="dashboard">
        <section className="hero-section">
          <div>
            <p className="section-label">TEAM WORKBOARD</p>
            <h2>Test your workflow with confidence.</h2>
            <p className="hero-description">
              A practical React task manager built to explore component testing,
              user interactions, API states, and custom hooks.
            </p>
          </div>

          <div className="hero-stat">
            <span>Active tasks</span>
            <strong>0</strong>
          </div>
        </section>

        <section className="task-section" aria-labelledby="tasks-heading">
          <div className="section-heading">
            <div>
              <p className="section-label">WORKBOARD</p>
              <h2 id="tasks-heading">Your tasks</h2>
            </div>

            <button type="button" disabled>
              Add task
            </button>
          </div>

          <div className="empty-state">
            <div className="empty-icon" aria-hidden="true">
              ✓
            </div>

            <h3>No tasks yet</h3>

            <p>
              Your task list will appear here once we build the task workflow.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

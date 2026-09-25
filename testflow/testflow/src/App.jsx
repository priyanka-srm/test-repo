import { useState } from "react";
import "./App.css";

const initialTasks = [
  {
    id: 1,
    title: "Review React Testing Library queries",
    description:
      "Practice choosing between getBy, queryBy, and findBy queries.",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Write user interaction tests",
    description:
      "Test task interactions using userEvent instead of implementation details.",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    title: "Review Vitest configuration",
    description:
      "Understand the jsdom environment, setup file, and test scripts.",
    priority: "Low",
    completed: true,
  },
  {
    id: 4,
    title: "Practice mocked API states",
    description:
      "Cover loading, success, error, and empty states for the task list.",
    priority: "High",
    completed: false,
  },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const activeTasks = tasks.filter((task) => !task.completed).length;

  function handleAddTask(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: trimmedTitle,
      description: description.trim(),
      priority,
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setIsFormOpen(false);
  }

  function handleDeleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }

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
              A practical React task manager built to explore component
              testing, user interactions, API states, and custom hooks.
            </p>
          </div>

          <div className="hero-stat">
            <span>Active tasks</span>
            <strong>{activeTasks}</strong>
          </div>
        </section>

        <section
          aria-labelledby="tasks-heading"
          className="task-section"
        >
          <div className="section-heading">
            <div>
              <p className="section-label">WORKBOARD</p>
              <h2 id="tasks-heading">Your tasks</h2>
            </div>

            <button
              type="button"
              onClick={() => setIsFormOpen((current) => !current)}
            >
              {isFormOpen ? "Close" : "Add task"}
            </button>
          </div>

          {isFormOpen && (
            <form className="task-form" onSubmit={handleAddTask}>
              <div className="form-field">
                <label htmlFor="task-title">Task title</label>

                <input
                  id="task-title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Enter task title"
                />
              </div>

              <div className="form-field">
                <label htmlFor="task-description">Description</label>

                <textarea
                  id="task-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe the task"
                  rows="3"
                />
              </div>

              <div className="form-field">
                <label htmlFor="task-priority">Priority</label>

                <select
                  id="task-priority"
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <button type="submit">Create task</button>
            </form>
          )}

          <div className="task-list">
            {tasks.map((task) => (
              <article
                key={task.id}
                className={`task-card ${
                  task.completed ? "is-completed" : ""
                }`}
              >
                <div className="task-card-content">
                  <div className="task-card-heading">
                    <h3>{task.title}</h3>

                    <span
                      className={`priority-badge priority-${task.priority.toLowerCase()}`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <p>{task.description}</p>
                </div>

                <div className="task-card-status">
                  <span
                    aria-label={
                      task.completed ? "Completed" : "Active"
                    }
                    className="task-status"
                  >
                    {task.completed ? "Completed" : "Active"}
                  </span>

                  <button
                    type="button"
                    className="delete-task-button"
                    onClick={() => handleDeleteTask(task.id)}
                    aria-label={`Delete ${task.title}`}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
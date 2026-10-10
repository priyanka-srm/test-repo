import { useEffect, useMemo, useRef, useState } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "./data/tasks";
import TaskList from "./components/TaskList/TaskList";
import useTaskFilters from "./hooks/useTaskFilters";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [formError, setFormError] = useState("");

  const titleInputRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  // Fetch tasks once when the component mounts.
  // Search and status filtering are handled locally by useTaskFilters.
  useEffect(() => {
    const controller = new AbortController();

    async function loadTasks() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getTasks({
          signal: controller.signal,
        });

        if (!Array.isArray(data)) {
          throw new Error("Invalid task data received.");
        }

        setTasks(data);
      } catch (err) {
        if (err?.name !== "AbortError") {
          setError("Unable to load tasks.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadTasks();

    return () => {
      controller.abort();
    };
  }, []);

  // Keep modal keyboard behavior and focus management accessible.
  useEffect(() => {
    if (!isFormOpen) {
      return undefined;
    }

    previouslyFocusedElementRef.current = document.activeElement;

    titleInputRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsFormOpen(false);
        resetForm();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElementRef.current?.focus?.();
    };
  }, [isFormOpen]);

  const filteredTasks = useTaskFilters(tasks, search, status);

  const activeTaskCount = useMemo(
    () =>
      tasks.filter(
        (task) => task && typeof task === "object" && !task.completed,
      ).length,
    [tasks],
  );

  async function handleToggleTask(task) {
    if (!task || task.id == null) {
      return;
    }

    const previousCompleted = Boolean(task.completed);
    const nextCompleted = !previousCompleted;

    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === task.id
          ? {
              ...item,
              completed: nextCompleted,
            }
          : item,
      ),
    );

    try {
      await updateTask(task.id, {
        completed: nextCompleted,
      });
    } catch {
      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item.id === task.id
            ? {
                ...item,
                completed: previousCompleted,
              }
            : item,
        ),
      );
    }
  }

  async function handleDeleteTask(id) {
    if (id == null) {
      return;
    }

    const previousTasks = tasks;

    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));

    try {
      await deleteTask(id);
    } catch {
      setTasks(previousTasks);
    }
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setFormError("");
    setIsSubmitting(false);
  }

  function openForm() {
    previouslyFocusedElementRef.current = document.activeElement;
    resetForm();
    setIsFormOpen(true);
  }

  function closeForm() {
    if (isSubmitting) {
      return;
    }

    setIsFormOpen(false);
    resetForm();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      setFormError("Task title is required.");
      return;
    }

    if (!trimmedDescription) {
      setFormError("Description is required.");
      return;
    }

    const newTask = {
      title: trimmedTitle,
      description: trimmedDescription,
      completed: false,
      priority,
    };

    setIsSubmitting(true);
    setFormError("");

    try {
      const createdTask = await createTask(newTask);

      if (
        !createdTask ||
        typeof createdTask !== "object" ||
        createdTask.id == null
      ) {
        throw new Error("Invalid task response.");
      }

      setTasks((currentTasks) => [...currentTasks, createdTask]);

      setIsFormOpen(false);
      resetForm();
    } catch {
      setFormError("Unable to create task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
              A practical React task manager built to explore component testing,
              user interactions, API states, and custom hooks.
            </p>
          </div>

          <div className="hero-stat">
            <span>Active tasks</span>
            <strong>{activeTaskCount}</strong>
          </div>
        </section>

        <section aria-labelledby="tasks-heading" className="task-section">
          <div className="section-heading">
            <div>
              <p className="section-label">WORKBOARD</p>
              <h2 id="tasks-heading">Your tasks</h2>
            </div>

            <button type="button" onClick={openForm}>
              Add task
            </button>
          </div>

          <div className="filters">
            <label htmlFor="task-search">Search tasks</label>

            <input
              id="task-search"
              type="search"
              placeholder="Search tasks..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <label htmlFor="task-status">Filter by status</label>

            <select
              id="task-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="all">All tasks</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {isLoading && (
            <div
              className="empty-state"
              role="status"
              aria-label="Loading tasks"
            >
              <h3>Loading tasks...</h3>
              <p>Fetching the latest tasks from the task service.</p>
            </div>
          )}

          {!isLoading && error && (
            <div className="empty-state error-state" role="alert">
              <h3>Unable to load tasks</h3>
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && filteredTasks.length === 0 && (
            <div className="empty-state" role="status">
              <h3>No tasks found</h3>
              <p>Try changing your search or status filter.</p>
            </div>
          )}

          {!isLoading && !error && filteredTasks.length > 0 && (
            <TaskList
              tasks={filteredTasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          )}
        </section>
      </main>

      {isFormOpen && (
        <div className="modal-backdrop">
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-task-title"
          >
            <div className="modal-header">
              <div>
                <p className="section-label">NEW TASK</p>
                <h2 id="add-task-title">Add a task</h2>
              </div>

              <button
                type="button"
                onClick={closeForm}
                aria-label="Close"
                disabled={isSubmitting}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="task-title">Task title</label>

                <input
                  ref={titleInputRef}
                  id="task-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Enter task title"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="task-description">Description</label>

                <textarea
                  id="task-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Enter task description"
                  rows={4}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="task-priority">Priority</label>

                <select
                  id="task-priority"
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              {formError && (
                <p className="form-error" role="alert">
                  {formError}
                </p>
              )}

              <div className="form-actions">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

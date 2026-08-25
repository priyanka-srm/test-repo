import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodos, addTodo, deleteTodo, updateTodo } from "../services/api";
import "./TodoApp.css";
function TodoApp() {
  const [title, setTitle] = useState("");
  const [addError, setAddError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const queryClient = useQueryClient();
  // ========================================
  // GET TODOS
  // ========================================
  const {
    data: todos = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
  // ========================================
  // ADD TODO
  // ========================================
  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onMutate: () => {
      setAddError("");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
      setTitle("");
    },
    onError: (error) => {
      setAddError(error.message);
    },
  });
  // ========================================
  // DELETE TODO
  // OPTIMISTIC UPDATE
  // ========================================
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id) => {
      setDeleteError("");
      await queryClient.cancelQueries({
        queryKey: ["todos"],
      });
      const previousTodos = queryClient.getQueryData(["todos"]);
      queryClient.setQueryData(["todos"], (oldTodos = []) =>
        oldTodos.filter((todo) => todo.id !== id),
      );
      return {
        previousTodos,
      };
    },
    onError: (error, _id, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
      setDeleteError(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
  // ========================================
  // UPDATE TODO
  // TOGGLE COMPLETED
  // ========================================
  const updateTodoMutation = useMutation({
    mutationFn: ({ id, updates }) => updateTodo(id, updates),
    onMutate: async ({ id, updates }) => {
      setUpdateError("");
      await queryClient.cancelQueries({
        queryKey: ["todos"],
      });
      const previousTodos = queryClient.getQueryData(["todos"]);
      queryClient.setQueryData(["todos"], (oldTodos = []) =>
        oldTodos.map((todo) =>
          todo.id === id ? { ...todo, ...updates } : todo,
        ),
      );
      return {
        previousTodos,
      };
    },
    onError: (error, _variables, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
      setUpdateError(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
  // ========================================
  // FORM SUBMIT
  // ========================================
  function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setAddError("Please enter a task title.");
      return;
    }
    addTodoMutation.mutate({
      title: trimmedTitle,
      completed: false,
    });
  }
  // ========================================
  // TOGGLE TODO
  // ========================================
  function handleToggle(todo) {
    updateTodoMutation.mutate({
      id: todo.id,
      updates: {
        completed: !todo.completed,
      },
    });
  }
  // ========================================
  // LOADING STATE
  // ========================================
  if (isLoading) {
    return (
      <div className="todo-page">
        <div className="loading-card">
          <div className="loader"></div>
          <h2>Loading your workspace</h2>
          <p>Fetching your latest tasks...</p>
        </div>
      </div>
    );
  }
  // ========================================
  // ERROR STATE
  // ========================================
  if (isError) {
    return (
      <div className="todo-page">
        <div className="error-card">
          <div className="error-icon">!</div>
          <h2>Unable to load your tasks</h2>
          <p>{error.message}</p>
          <button
            type="button"
            className="retry-button"
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: ["todos"],
              })
            } >
            Try again
          </button>
        </div>
      </div>
    );
  }
  // ========================================
  // STATS
  // ========================================
  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.length - completedCount;
  const completionPercentage =
    todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100);
  // ========================================
  // UI
  // ========================================
  return (
    <div className="todo-page">
      <div className="todo-container">
        {/* ================= HEADER ================= */}
        <header className="todo-header">
          <div>
            <div className="brand-row">
              <div className="brand-icon">✓</div>
              <div>
                <p className="brand-name">TaskFlow</p>
                <p className="brand-subtitle">Personal productivity</p>
              </div>
            </div>
            <div className="workspace-label">YOUR WORKSPACE</div>
            <h1>
              Stay focused.
              <br />
              <span>Get things done.</span>
            </h1>
            <p className="hero-description">
              Organize your day, keep track of your progress, and finish what
              matters.
            </p>
          </div>
          <div className="system-status">
            <span className="status-dot"></span>
            All systems operational
          </div>
        </header>
        {/* ================= PROGRESS ================= */}
        <section className="progress-card">
          <div className="progress-info">
            <div>
              <p className="section-label">Completion</p>
              <strong>{completionPercentage}%</strong>
            </div>
            <div className="progress-summary">
              {completedCount} of {todos.length} tasks completed
            </div>
          </div>
          <div
            className="progress-track"
            aria-label={`Task completion ${completionPercentage}%`}>
            <div
              className="progress-fill"
              style={{
                width: `${completionPercentage}%`,
              }}
            ></div>
          </div>
        </section>
        {/* ================= STATS ================= */}
        <section className="stats-grid" aria-label="Task statistics">
          <div className="stat-card">
            <div className="stat-icon">≡</div>
            <div>
              <span>Total tasks</span>
              <strong>{todos.length}</strong>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">◷</div>
            <div>
              <span>In progress</span>
              <strong>{pendingCount}</strong>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon completed-icon">✓</div>
            <div>
              <span>Completed</span>
              <strong>{completedCount}</strong>
            </div>
          </div>
        </section>
        {/* ================= ADD TODO ================= */}
        <section className="add-card">
          <div className="card-heading">
            <div>
              <h2>Create a new task</h2>
              <p>Add something you want to accomplish.</p>
            </div>
            <div className="add-icon">+</div>
          </div>
          <form onSubmit={handleSubmit} className="add-form">
            <div className="input-wrapper">
              <label htmlFor="task-title">Task title</label>
              <input
                id="task-title"
                type="text"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  if (addError) {
                    setAddError("");
                  }
                }}
                placeholder="e.g. Finish React project"
                disabled={addTodoMutation.isPending} />
            </div>
            <button
              type="submit"
              className="add-button"
              disabled={addTodoMutation.isPending} >
              {addTodoMutation.isPending ? (
                "Adding..."
              ) : (
                <>
                  <span>+</span>
                  Add task
                </>
              )}
            </button>
          </form>
          {addError && (
            <p className="form-error" role="alert">
              {addError}
            </p>
          )}
        </section>
        {/* ================= TASK LIST ================= */}
        <section className="list-card">
          <div className="list-header">
            <div>
              <p className="section-label">YOUR TASKS</p>
              <h2>Task list</h2>
            </div>
            <span className="task-count">
              {todos.length} {todos.length === 1 ? "task" : "tasks"}
            </span>
          </div>
          {/* FETCHING INDICATOR */}
          {isFetching && <div className="refresh-indicator">Syncing...</div>}
          {/* EMPTY STATE */}
          {todos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✓</div>
              <h3>Your workspace is clear</h3>
              <p>Create your first task and start making progress.</p>
            </div>
          ) : (
            <div className="todo-list">
              {todos.map((todo, index) => (
                <article
                  className={`todo-item ${
                    todo.completed ? "todo-item-completed" : ""
                  }`}
                  key={todo.id} >
                  <div className="task-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <button
                    type="button"
                    className={`check-button ${
                      todo.completed ? "checked" : ""
                    }`}
                    onClick={() => handleToggle(todo)}
                    aria-label={
                      todo.completed
                        ? `Mark ${todo.title} as in progress`
                        : `Mark ${todo.title} as completed`
                    }
                    aria-pressed={todo.completed}
                    disabled={updateTodoMutation.isPending}>
                    {todo.completed ? "✓" : ""}
                  </button>
                  <div className="task-content">
                    <p className="todo-title">{todo.title}</p>
                    <span
                      className={`todo-status ${
                        todo.completed ? "status-completed" : "status-progress"
                      }`}>
                      {todo.completed ? "Completed" : "In progress"}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => deleteTodoMutation.mutate(todo.id)}
                    disabled={deleteTodoMutation.isPending} >
                    <span>×</span>
                    {deleteTodoMutation.isPending ? "Deleting..." : "Delete"}
                  </button>
                </article>
              ))}
            </div>
          )}
          {deleteError && (
            <p className="mutation-error" role="alert">
              {deleteError}
            </p>
          )}
          {updateError && (
            <p className="mutation-error" role="alert">
              {updateError}
            </p>
          )}
        </section>
        {/* ================= FOOTER ================= */}
        <footer className="todo-footer">
          <span>TaskFlow</span>
          <span>•</span>
          <span>Built with React Query</span>
        </footer>
      </div>
    </div>
  );
}
export default TodoApp;

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodos, addTodo, deleteTodo } from "../services/api";
import "./TodoApp.css";
function TodoApp() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();
  // =========================
  // GET TODOS
  // =========================
  const {
    data: todos = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
  // =========================
  // ADD TODO
  // =========================
  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
      setTitle("");
    },
  });
  // =========================
  // OPTIMISTIC DELETE
  // =========================
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    // 1. Before DELETE request
    onMutate: async (id) => {
      // Stop any ongoing todos request
      await queryClient.cancelQueries({
        queryKey: ["todos"],
      });
      // Save current todos
      const previousTodos = queryClient.getQueryData(["todos"]);
      // Remove todo immediately from UI
      queryClient.setQueryData(["todos"], (oldTodos = []) =>
        oldTodos.filter((todo) => todo.id !== id),
      );
      // Return previous data for rollback
      return {
        previousTodos,
      };
    },
    // 2. If DELETE fails
    onError: (_error, _id, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    // 3. After success OR failure
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
  // =========================
  // FORM SUBMIT
  // =========================
  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    addTodoMutation.mutate({
      title: title.trim(),
      completed: false,
    });
  }
  // =========================
  // LOADING
  // =========================
  if (isLoading) {
    return (
      <div className="todo-page">
        <div className="todo-card">
          <div className="loader"></div>
          <p>Loading your todos...</p>
        </div>
      </div>
    );
  }
  // =========================
  // ERROR
  // =========================
  if (isError) {
    return (
      <div className="todo-page">
        <div className="todo-card error-card">
          <div className="error-icon">!</div>
          <h2>Failed to load todos</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }
  // =========================
  // STATS
  // =========================
  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.length - completedCount;
  // =========================
  // UI
  // =========================
  return (
    <div className="todo-page">
      <div className="todo-container">
        {/* HEADER */}
        <header className="todo-header">
          <div>
            <p className="eyebrow">PHASE 10 • SERVER STATE</p>
            <h1>
              My <span>Todo</span> List
            </h1>
            <p className="subtitle">Stay organized. Get things done.</p>
          </div>
          <div className="header-icon">✓</div>
        </header>
        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div>
              <span>Total Tasks</span>
              <strong>{todos.length}</strong>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div>
              <span>Pending</span>
              <strong>{pendingCount}</strong>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div>
              <span>Completed</span>
              <strong>{completedCount}</strong>
            </div>
          </div>
        </div>
        {/* ADD TODO */}
        <div className="add-card">
          <h2>Add a new task</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}/>
            <button type="submit" disabled={addTodoMutation.isPending}>
              {addTodoMutation.isPending ? "Adding..." : "+ Add Task"}
            </button>
          </form>
        </div>
        {/* TODO LIST */}
        <div className="list-card">
          <div className="list-header">
            <div>
              <h2>Your Tasks</h2>
              <p>
                {todos.length === 0
                  ? "No tasks yet"
                  : `${todos.length} task${todos.length > 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
          {/* EMPTY STATE */}
          {todos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No tasks yet</h3>
              <p>Add your first task above and start getting things done.</p>
            </div>
          ) : (
            /* TODO LIST */
            <div className="todo-list">
              {todos.map((todo) => (
                <div className="todo-item" key={todo.id}>
                  <div className="todo-left">
                    <div
                      className={todo.completed ? "check completed" : "check"}>
                      {todo.completed ? "✓" : ""}
                    </div>
                    <div>
                      <p
                        className={
                          todo.completed ? "todo-title completed" : "todo-title"
                        }>
                        {todo.title}
                      </p>
                      <span className="todo-status">
                        {todo.completed ? "Completed" : "In progress"}
                      </span>
                    </div>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTodoMutation.mutate(todo.id)}
                    disabled={deleteTodoMutation.isPending}>
                    {deleteTodoMutation.isPending ? "Deleting..." : "Delete"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default TodoApp;

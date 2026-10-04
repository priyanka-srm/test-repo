function TaskCard({ task, onToggle, onDelete }) {
  const priorityLabel =
    task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

  return (
    <article className={`task-card ${task.completed ? "is-completed" : ""}`}>
      <div className="task-card-content">
        <div className="task-card-heading">
          <div className="task-title-row">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task)}
              aria-label={`Mark ${task.title} as ${
                task.completed ? "active" : "completed"
              }`}
            />

            <h3>{task.title}</h3>
          </div>

          <span className={`priority-badge priority-${task.priority}`}>
            {priorityLabel}
          </span>
        </div>

        <p>{task.description}</p>
      </div>

      <div className="task-card-status">
        <span
          className="task-status"
          aria-label={task.completed ? "Completed" : "Active"}
        >
          {task.completed ? "Completed" : "Active"}
        </span>

        <div className="task-actions">
          <button
            type="button"
            onClick={() => onToggle(task)}
            aria-label={`Mark ${task.title} as ${
              task.completed ? "active" : "complete"
            }`}
          >
            {task.completed ? "Mark active" : "Complete"}
          </button>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.title}`}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;

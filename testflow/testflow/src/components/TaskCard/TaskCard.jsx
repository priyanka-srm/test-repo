function TaskCard({ task }) {
  const priorityLabel =
    task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

  return (
    <article className={`task-card ${task.completed ? "is-completed" : ""}`}>
      <div className="task-card-content">
        <div className="task-card-heading">
          <h3>{task.title}</h3>

          <span className={`priority-badge priority-${task.priority}`}>
            {priorityLabel}
          </span>
        </div>

        <p>{task.description}</p>
      </div>

      <div className="task-card-status">
        <span
          className="task-status"
          aria-label={task.completed ? "Completed" : "Active"}>
          {task.completed ? "Completed" : "Active"}
        </span>
      </div>
    </article>
  );
}

export default TaskCard;
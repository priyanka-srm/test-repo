function TaskItem({ task, deleteTask, toggleTask }) {
  return (
    <div className="task-item">
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}/>
        <span className={task.completed ? "completed" : ""}>{task.text}</span>
      </label>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
}
export default TaskItem;

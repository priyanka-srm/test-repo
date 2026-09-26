import TaskCard from "../TaskCard/TaskCard";

function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon" aria-hidden="true">
          ✓
        </div>

        <h3>No tasks found</h3>

        <p>There are no tasks matching your current view.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;

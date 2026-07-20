import TaskItem from "./TaskItem";
function TaskList({
  tasks,
  deleteTask,
  toggleTask,
  totalTasks,
  completedTasks,
  pendingTasks
}) {
  return (
    <div className="task-list">
      <h2>📋 My Tasks</h2>
      {
        tasks.length === 0 ? (
          <p>No Tasks Available</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleTask={toggleTask} />
          ))
        )
      }
      <div className="task-counter">
        <h3>📊 Task Summary</h3>
        <p>
          Total Tasks: {totalTasks}
        </p>
        <p>
          Completed Tasks: {completedTasks}
        </p>
        <p>
          Pending Tasks: {pendingTasks}
        </p>
      </div>
    </div>
  );
}
export default TaskList;
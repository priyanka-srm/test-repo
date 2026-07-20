import { useState } from "react";
function TaskForm({ addTask }) {
  const [taskText, setTaskText] = useState("");
  function handleChange(event) {
    setTaskText(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (taskText.trim() === "") {
      return;
    }
    addTask(taskText);
    setTaskText("");
  }
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new task..."
        value={taskText}
        onChange={handleChange} />
      <button type="submit"> Add Task </button>
    </form>
  );
}
export default TaskForm;
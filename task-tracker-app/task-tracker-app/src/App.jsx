import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Learn React",
      completed: false,
    },
    {
      id: 2,
      text: "Learn JavaScript",
      completed: false,
    },
    {
      id: 3,
      text: "Learn CSS",
      completed: true,
    },
  ]);
  // Add Task
  function addTask(text) {
    const newTask = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  }
  // Delete Task
  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }
  // Toggle Complete / Incomplete
  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  }
  // Task Counter
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  return (
    <div className="app">
      <div className="container">
        <h1>📝 Task Tracker</h1>
        <TaskForm addTask={addTask} />
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          pendingTasks={pendingTasks} />
      </div>
    </div>
  );
}
export default App;

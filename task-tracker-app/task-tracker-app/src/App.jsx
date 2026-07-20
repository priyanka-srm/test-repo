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
      id: Date.now(),
      text: text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }
  // Delete Task
  function deleteTask(id) {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );
    setTasks(updatedTasks);
  }
  // Toggle Complete / Incomplete
  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  }
  // Task Counter
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;
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
# 📝 React Task Tracker

A simple and interactive **Task Tracker application** built using React and Vite.

This project focuses on learning and implementing core React concepts like **components, props, state management, event handling, controlled components, conditional rendering, and dynamic UI updates**.

---

## 🚀 Features

### ➕ Add Task

- Users can enter a new task using the input field.
- New tasks are added dynamically to the task list.
- Empty task submission is prevented using validation.

### 🗑️ Delete Task

- Users can delete tasks from the task list.
- Deleting a task updates the React state and automatically updates the UI.

### 📋 Task List

- Displays all tasks dynamically.
- Uses reusable components for better code organization.
- Each task is rendered using a separate `TaskItem` component.

### ✅ Task Status

- Completed tasks display with ✅ icon.
- Pending tasks display with ⬜ icon.

### 📊 Task Counter

The application displays:

- Total Tasks
- Completed Tasks
- Pending Tasks

### 🚫 Empty State Handling

- Displays "No Tasks Available" when there are no tasks.

---

# 🏗️ Project Structure

```
src
│
├── components
│   │
│   ├── TaskForm.jsx
│   ├── TaskList.jsx
│   └── TaskItem.jsx
│
├── App.jsx
└── main.jsx
```

---

# 🔄 Application Flow

```
                 App.jsx
                    |
        -------------------------
        |                       |
    TaskForm              TaskList
        |                       |
    Add Task              TaskItem
                                |
                          Delete Task
```

---

# 🧠 React Concepts Implemented

## 1. Functional Components

The application is divided into reusable components:

- App
- TaskForm
- TaskList
- TaskItem

Each component follows a single responsibility approach.

---

## 2. Props

Props are used for communication between parent and child components.

Example:

```jsx
<TaskForm addTask={addTask} />

<TaskList
  tasks={tasks}
  deleteTask={deleteTask}
/>
```

The parent component passes data and functions to child components.

---

## 3. useState Hook

React state is used to manage dynamic task data.

Example:

```jsx
const [tasks, setTasks] = useState([]);
```

Whenever the state changes, React automatically re-renders the UI.

---

## 4. Controlled Components

The input field value is controlled using React state.

Example:

```jsx
<input
  value={taskText}
  onChange={handleChange}
/>
```

Data flow:

```
User Types
    ↓
onChange Event
    ↓
State Update
    ↓
UI Update
```

---

## 5. Event Handling

React events are handled using:

- onChange
- onSubmit
- onClick

Example:

```jsx
<button onClick={handleSubmit}>
  Add Task
</button>
```

---

## 6. Dynamic List Rendering

Tasks are displayed dynamically using JavaScript `map()`.

Example:

```jsx
tasks.map((task) => (
  <TaskItem 
    key={task.id}
    task={task}
  />
))
```

---

## 7. Conditional Rendering

Conditional rendering is used to display different UI based on task availability.

Example:

```jsx
tasks.length === 0
?
"No Tasks Available"
:
"Display Tasks"
```

---

# 🛠️ Technologies Used

- React JS
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone <repository-url>
```

## Navigate to Project Folder

```bash
cd task-tracker
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

---

# 🎯 Learning Outcomes

Through this project, I learned:

- Creating reusable React components
- Managing application state using useState
- Passing data between components using props
- Handling user interactions
- Creating controlled input components
- Rendering dynamic lists
- Implementing conditional rendering
- Managing component communication

---

# 🔮 Future Improvements

Planned improvements:

- Complete / Incomplete task toggle
- Edit task functionality
- LocalStorage persistence
- Task filtering
- Dark mode support
- Improved UI design

---
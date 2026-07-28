# 📝 React Task Tracker

A simple and interactive **Task Tracker application** built using **React** and **Vite**.

This project focuses on learning and implementing core React concepts such as **components, props, state management, event handling, controlled components, conditional rendering, immutable state updates, and dynamic UI rendering**.

---

## 🚀 Features

### ➕ Add Task

- Users can add new tasks dynamically.
- Empty task submission is prevented using input validation.

### 🗑️ Delete Task

- Users can delete tasks from the list.
- The UI updates automatically after deletion.

### 📋 Task List

- Displays all tasks dynamically.
- Uses reusable React components.
- Each task is rendered using a separate `TaskItem` component.

### ✅ Task Status

- Mark tasks as completed or incomplete using a checkbox.
- Completed tasks are displayed with a **strikethrough** effect.

### 📊 Task Counter

Displays:

- Total Tasks
- Completed Tasks
- Pending Tasks

### 🚫 Empty State Handling

- Displays **"No Tasks Available"** when the task list is empty.

---

# 🏗️ Project Structure

```text
src
│
├── components
│   ├── TaskForm.jsx
│   ├── TaskList.jsx
│   └── TaskItem.jsx
│
├── App.jsx
└── main.jsx
```

---

# 🔄 Application Flow

```text
                 App.jsx
                    │
        ┌───────────┴───────────┐
        │                       │
    TaskForm               TaskList
                                │
                           TaskItem
```

---

# 🧠 React Concepts Implemented

## 1. Functional Components

The application is divided into reusable components:

- App
- TaskForm
- TaskList
- TaskItem

---

## 2. Props

Props are used to pass data and functions between parent and child components.

Example:

```jsx
<TaskForm addTask={addTask} />

<TaskList
  tasks={tasks}
  deleteTask={deleteTask}
  toggleTask={toggleTask}
/>
```

---

## 3. useState Hook

The application uses the `useState` Hook to manage the task list.

```jsx
const [tasks, setTasks] = useState([]);
```

State updates automatically re-render the UI.

---

## 4. Controlled Components

The task input field is implemented as a controlled component.

```jsx
<input
  value={taskText}
  onChange={handleChange}
/>
```

Flow:

```text
User Input
     ↓
onChange Event
     ↓
State Update
     ↓
UI Re-render
```

---

## 5. Event Handling

The project uses React event handlers:

- `onChange`
- `onSubmit`
- `onClick`

---

## 6. Dynamic List Rendering

Tasks are rendered dynamically using `map()`.

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

Displays different UI depending on whether tasks exist.

```jsx
tasks.length === 0
  ? "No Tasks Available"
  : "Display Tasks"
```

---

## 8. Immutable State Updates

State is updated immutably using:

- Spread operator (`...`)
- `map()`
- `filter()`

The project also uses the **functional update form** of `setState`:

```jsx
setTasks((prev) => [...prev, newTask]);
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

## Run the Development Server

```bash
npm run dev
```

---

# 🎯 Learning Outcomes

Through this project, I learned:

- Creating reusable React components
- Managing state with `useState`
- Passing data using props
- Handling React events
- Building controlled forms
- Rendering dynamic lists
- Implementing conditional rendering
- Updating state immutably
- Using functional state updates for safer state management

---

# 🔮 Future Improvements

- Edit task functionality
- LocalStorage persistence
- Task filtering
- Dark mode support
- Improved UI design
# Phase 5 — Drag & Drop Kanban Board

---

# Project Overview

The Drag & Drop Kanban Board is a task management application built using JavaScript DOM manipulation and Event Handling concepts.

The project allows users to create tasks and move them between different workflow stages:

- To Do
- In Progress
- Done

---

# Features

✅ Add New Task

✅ Delete Task

✅ Drag and Drop Tasks

✅ Move Tasks Between Columns

✅ Event Delegation

✅ Local Storage Persistence

✅ Responsive Design

---

# Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Local Storage API

---

# Project Structure

```text
kanban-board/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

# Phase 5 Concepts Used

## 1. Event Bubbling

Event bubbling occurs when an event starts from the target element and moves upward through parent elements.

### Example

```js
task.addEventListener("click", () => {
  console.log("Task Clicked");
});

column.addEventListener("click", () => {
  console.log("Column Clicked");
});
```

### Flow

```text
Task → Column → Board → Document
```

### Use Case

Used for event delegation and centralized event handling.

---

## 2. Event Capturing

Event capturing occurs before bubbling.

### Example

```js
column.addEventListener(
  "click",
  () => {
    console.log("Capturing Phase");
  },
  true
);
```

### Flow

```text
Document → Board → Column → Task
```

### Use Case

Useful when parent elements should react before child elements.

---

## 3. event.target

Represents the actual element that triggered the event.

### Example

```js
board.addEventListener("click", (event) => {
  console.log(event.target);
});
```

### Use Case

Identifying which task was clicked.

---

## 4. event.currentTarget

Represents the element where the listener is attached.

### Example

```js
board.addEventListener("click", (event) => {
  console.log(event.currentTarget);
});
```

### Use Case

Identifying the element handling the event.

---

## 5. preventDefault()

Used to stop default browser behavior.

### Example

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();
});
```

### Use Case

Prevents page refresh during form submission.

---

## 6. stopPropagation()

Stops event bubbling.

### Example

```js
deleteBtn.addEventListener("click", (event) => {
  event.stopPropagation();
});
```

### Use Case

Prevents parent click handlers from executing.

---

## 7. Event Delegation

A single listener handles events for multiple child elements.

### Example

```js
board.addEventListener("click", (event) => {

  const deleteBtn =
    event.target.closest(".delete-btn");

  if (!deleteBtn) return;

  deleteTask(deleteBtn.dataset.id);

});
```

### Benefits

- Better Performance
- Less Memory Usage
- Supports Dynamic Elements
- Cleaner Code

---

## 8. Drag and Drop API

Used to move tasks between columns.

### Drag Start

```js
task.addEventListener("dragstart", () => {
  draggedTask = task;
});
```

### Drop

```js
column.addEventListener("drop", () => {
  column.appendChild(draggedTask);
});
```

### Use Case

Allows visual task movement between workflow stages.

---

# Local Storage Integration

## Save Tasks

```js
localStorage.setItem(
  STORAGE_KEY,
  JSON.stringify(tasks)
);
```

## Load Tasks

```js
JSON.parse(
  localStorage.getItem(STORAGE_KEY)
);
```

---

# Production Improvements

## Storage Manager

```js
class StorageManager {

  static KEY = "kanbanTasks";

  static save(tasks) {

    localStorage.setItem(
      this.KEY,
      JSON.stringify(tasks)
    );

  }

}
```

### Benefits

- Separation of Concerns
- Reusable Storage Logic

---

## Error Handling

```js
try {

  const data =
  JSON.parse(localStorage.getItem(KEY));

} catch(error) {

  console.error(error);

}
```

### Benefits

- Prevents App Crashes
- Handles Corrupted Data

---

# Challenges Faced

## Drag and Drop State Management

Maintaining reference to the currently dragged task.

### Solution

Used a dedicated variable to store the active task.

---

## Dynamic Rendering

Tasks are created dynamically.

### Solution

Used event delegation instead of multiple listeners.

---

## Local Storage Persistence

Tasks disappeared after refresh.

### Solution

Implemented save and load functionality using Local Storage.

---

# Concepts Practiced

- Event Bubbling
- Event Capturing
- event.target
- event.currentTarget
- preventDefault()
- stopPropagation()
- Event Delegation
- Drag and Drop API
- DOM Manipulation
- Local Storage
- Classes
- Static Methods
- Error Handling

---

# Future Improvements

- Task Priority
- Due Dates
- Search Tasks
- Dark Mode
- Multiple Boards
- Team Collaboration

---

# Conclusion

The Drag & Drop Kanban Board project provided practical experience with advanced DOM Events and Event Delegation concepts.

The project demonstrated how event propagation works, how drag-and-drop interactions are implemented, and how Local Storage can be used for data persistence.

This project serves as a practical implementation of Phase 5 concepts and strengthens understanding of real-world frontend development patterns.
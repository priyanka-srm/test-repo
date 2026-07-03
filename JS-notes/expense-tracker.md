# 💰 Advanced Expense Tracker

A modern and responsive **Expense Tracker** built using **HTML, CSS, and Vanilla JavaScript (ES6 Modules)**.

This project helps users manage daily expenses by adding, filtering, searching, and deleting expense records while maintaining persistent data using **Local Storage**. The application follows a **modular JavaScript architecture** with separate modules for UI, State Management, Storage, Event Handling, Utility Functions, and Application Configuration.

---

# 🚀 Live Features

- ➕ Add new expenses
- 🗑 Delete individual expenses
- 🧹 Clear all expenses
- 🔍 Search expenses by description
- 🏷 Filter expenses by category
- 📅 Store expense date
- 📊 Real-time expense summary
- 💰 Category-wise expense calculation
- 🕘 Deleted expense history
- 💾 Local Storage persistence
- 📱 Responsive design
- 🎨 Modern glassmorphism UI
- ⚡ Debounced search
- 🧩 Modular JavaScript (ES Modules)
- 📦 Centralized application configuration
- 🧠 State management
- ✅ Input validation
- ♻ Reusable utility functions

---

# 🛠 Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- ES Modules
- Local Storage API
- DOM Manipulation
- CSS Variables
- CSS Grid
- Flexbox
- Responsive Design

---

# 📂 Project Structure

```
Expense Tracker
│
├── css
│   └── style.css
│
├── index.html
│
├── js
│   ├── app.js
│   ├── config.js
│   ├── handlers.js
│   ├── script.js
│   ├── state.js
│   ├── storage.js
│   ├── ui.js
│   └── utils.js
│
└── README.md
```

---

# 📦 Module Overview

## script.js

Application entry point.

Responsible for

- Starting the application
- Importing the main application module

---

## app.js

Application controller.

Responsible for

- Initializing the application
- Registering event listeners
- Form submission
- Search functionality
- Category filtering
- Delete events
- Clear all functionality

---

## handlers.js

Contains business logic.

Includes

- Add expense
- Delete expense
- Clear all expenses
- Initialize application
- Search and filter expenses
- Validation handling

---

## ui.js

Responsible for UI rendering.

Includes

- Expense rendering
- Summary rendering
- Deleted history rendering
- Empty state
- Form reset
- User messages

---

## storage.js

Handles Local Storage.

Stores

- Expenses
- Deleted history

Provides

- Save data
- Load data
- Clear storage

---

## state.js

Centralized application state.

Maintains

- Expense list
- Deleted history
- Search text
- Selected category
- Editing state

---

## utils.js

Reusable helper functions.

Includes

- Currency formatter
- Date formatter
- Input validation
- Unique ID generation
- Debounce function

---

## constants.js

Application configuration.

Contains

- Storage keys
- Validation rules
- Categories
- Default state
- Application messages

---

# 💡 JavaScript Concepts Used

- ES Modules
- Import / Export
- State Management
- Local Storage
- Event Delegation
- Debouncing
- Higher Order Functions
- Array Methods
- map()
- filter()
- reduce()
- find()
- some()
- Template Literals
- Arrow Functions
- Object Literals
- Spread Operator
- Destructuring
- DOM Manipulation
- Event Listeners
- Form Handling
- Input Validation
- Modular Architecture
- Separation of Concerns

---

# 📊 Application Workflow

1. User adds a new expense.
2. Input is validated.
3. Expense object is created.
4. Application state is updated.
5. Local Storage is synchronized.
6. Expense table is rendered.
7. Summary section is recalculated.
8. Search and category filters update the displayed data dynamically.
9. Deleted expenses are moved to history instead of being lost immediately.

---

# 📱 Responsive Design

Optimized for

- Desktop
- Laptop
- Tablet
- Mobile Devices

---

# 🎨 UI Highlights

- Modern Glassmorphism Design
- CSS Variables
- Smooth Hover Effects
- Responsive Layout
- Custom Scrollbar
- Fade-in Animation
- Interactive Buttons
- Clean Table Layout

---

# 🔒 Data Persistence

All application data is stored locally using **Local Storage**.

Stored Data

- Expenses
- Deleted Expense History

---

# 📚 Learning Outcomes

This project helped practice

- Modular JavaScript Architecture
- State Management
- Local Storage
- Event Delegation
- Debouncing
- Form Validation
- Search & Filtering
- CRUD Operations
- Responsive UI Design
- Code Reusability
- Separation of Concerns
- Clean Folder Structure

---

# 🚀 Future Improvements

- ✏ Edit Expense
- 📈 Expense Charts
- 🌙 Dark / Light Theme
- 📤 Export to CSV
- 📅 Monthly Reports
- 📊 Analytics Dashboard
- 🔄 Undo Delete
- ☁ Cloud Storage Integration

---
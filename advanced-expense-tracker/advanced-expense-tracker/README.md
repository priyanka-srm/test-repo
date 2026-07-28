# 💰 Advanced Expense Tracker

A modern expense management application built using React and Vite.

This project helps users manage their daily expenses by adding, editing, deleting, searching, filtering and restoring expenses with persistent data storage using LocalStorage.

---

# 🚀 Features

## ✅ Expense Management

- Add new expenses
- View all expenses
- Edit existing expenses
- Update expense details
- Delete expenses
- Restore deleted expenses
- Reset expense form after submission


## 🔍 Search Expense

Users can search expenses based on description.

Examples:

- Food
- Travel
- Shopping


## 🔎 Category Filter

Users can filter expenses based on categories.

Features:

- View all expenses
- Filter expenses by category
- Dynamic category selection


## 📊 Expense Summary

Dashboard displays:

- Total number of expenses
- Total amount spent
- Number of categories used


## 🗑 Deleted History

Deleted expenses are stored separately instead of permanently removing them.

Features:

- View deleted expenses
- Restore deleted expenses
- Maintain deleted expense history


---

# 🛠 Technologies Used

## Frontend

- React JS
- Vite
- JavaScript ES6+
- CSS


## Storage

- Browser LocalStorage


---

# ⚛️ React Concepts Used (Phase 5)

This project was built while learning React Phase 5 concepts including Hooks, State Management and Component Architecture.


---

# 1. Component Architecture

The application is divided into multiple reusable components.

Project Structure:

```
src
│
├── App.jsx
├── App.css
│
├── components
│   ├── AddExpense.jsx
│   ├── ExpenseList.jsx
│   ├── ExpenseItem.jsx
│   ├── SearchBar.jsx
│   ├── Filter.jsx
│   ├── Summary.jsx
│   └── DeletedHistory.jsx
│
└── hooks
    └── useLocalStorage.js
```

Benefits:

- Better code organization
- Reusable components
- Easy maintenance


---

# 2. useState Hook

useState is used to manage dynamic data inside React components.

Used for managing:

- Expense list
- Deleted expenses
- Edit expense state
- Search value
- Filter category
- Form input values


Example:

```javascript
const [expenses, setExpenses] = useState([]);
```


---

# 3. Controlled Components

All form inputs are controlled by React state.

Expense form fields:

- Description
- Amount
- Category
- Date


Example:

```javascript
<input
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>
```

Benefits:

- React controls form data
- Easy validation
- Better state management


---

# 4. Props Passing

Data and functions are passed between components using props.


Examples:


App.jsx → AddExpense.jsx

Props:

- addExpense
- updateExpense
- cancelEdit


App.jsx → ExpenseList.jsx

Props:

- expenses
- deleteExpense
- handleEdit


This helps components communicate with each other.


---

# 5. Custom Hook - useLocalStorage

A reusable custom hook was created to handle LocalStorage operations.

File:

```
hooks/useLocalStorage.js
```


Purpose:

- Store expense data permanently
- Restore data after browser refresh
- Reuse LocalStorage logic


Example:

```javascript
const [expenses, setExpenses] = useLocalStorage(
"expenses",
[]
);
```


---

# 6. CRUD Operations

Implemented complete expense management functionality.


## Create

Adding new expenses.


## Read

Displaying expense records.


## Update

Editing existing expense details.


## Delete

Removing expenses and moving them into deleted history.


---

# 7. State Management

Main application state is managed in App.jsx.


States used:

```javascript
expenses

deletedExpenses

editExpense

search

filterCategory
```


App.jsx acts as the main state controller and passes required data to child components.


---

# 8. Conditional Rendering

The UI changes based on application state.


Examples:

- Add Expense / Edit Expense title
- Add button / Update button
- Cancel button during edit mode
- Empty expense messages
- Deleted history visibility


---

# 9. JavaScript Array Methods Used


## map()

Used to display expense lists dynamically.

Example:

```javascript
expenses.map()
```


## filter()

Used for:

- Delete functionality
- Search filtering
- Category filtering


Example:

```javascript
expenses.filter()
```


## reduce()

Used for calculating total expenses.


Example:

```javascript
expenses.reduce()
```


## find()

Used for:

- Finding expense during edit
- Restoring deleted expense


Example:

```javascript
expenses.find()
```


---

# 🔄 Application Flow

```
User Input
     |
     ↓
AddExpense Component
     |
     ↓
App.jsx State Management
     |
     ↓
LocalStorage
     |
     ↓
ExpenseList Component
     |
     ↓
Display Updated Expenses
```


---

# 📂 Main Features Implementation


## Add Expense Flow

1. User enters expense details
2. Form data is stored using React state
3. Expense object is created
4. Data is added to expense list
5. LocalStorage is updated


## Edit Expense Flow

1. User clicks edit button
2. Selected expense data is passed to form
3. Form automatically displays existing values
4. User updates details
5. Expense list gets updated


## Delete Expense Flow

1. User clicks delete button
2. Expense is removed from main list
3. Deleted expense is stored separately
4. User can restore it later


## Search & Filter Flow

1. User enters search text
2. Expense list is filtered
3. Category filter further narrows results
4. Matching expenses are displayed


---

# 🎯 Learning Outcomes

Through this project, I learned and practiced:

- React component architecture
- React Hooks
- useState management
- Custom Hooks
- Controlled Components
- Props communication
- CRUD operations
- LocalStorage handling
- Conditional rendering
- JavaScript array methods
- Building a complete React application


---

# ▶️ Installation & Setup


Clone the repository:

```bash
git clone <repository-url>
```


Navigate to project folder:

```bash
cd advanced-expense-tracker
```


Install dependencies:

```bash
npm install
```


Start development server:

```bash
npm run dev
```


---

# 🚀 Future Improvements

Future enhancements:

- Monthly expense charts
- Authentication system
- Backend database integration
- Export expenses as CSV
- Dark mode support
- Mobile responsive design


---

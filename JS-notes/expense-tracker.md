# 💰 Expense Tracker

A modern Expense Tracker web application built using HTML, CSS, and JavaScript.  
This project helps users add expenses, filter them by category, calculate totals dynamically, and manage expense records using modern JavaScript array methods and ES6+ concepts.

---

# 🚀 Features

✅ Add Expenses  
✅ Delete Expenses  
✅ Filter by Category  
✅ Calculate Total Expenses  
✅ Category-wise Totals  
✅ Dynamic UI Rendering  
✅ Responsive Design  
✅ Uses Array Methods Only  
✅ Private Delete History using Closures  
✅ Real-time Updates  

---

# 🧠 ES6+ Concepts Used

## 1. Arrow Functions

```js
expenses.forEach((expense) => {
  console.log(expense);
});
```

---

## 2. Template Literals

```js
row.innerHTML = `
  <td>${expense.description}</td>
`;
```

---

## 3. Destructuring

```js
const { description, amount, category } = expense;
```

---

## 4. Spread Operator

```js
expenses = [...expenses, newExpense];
```

---

## 5. Rest Parameters

```js
function total(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
```

---

## 6. Default Parameters

```js
function showMessage(msg = "No Expenses") {
  console.log(msg);
}
```

---

## 7. Filter Method

```js
const foodExpenses =
expenses.filter(
  expense => expense.category === "Food"
);
```

---

## 8. Map Method

```js
expenses.map((expense) => {
  console.log(expense.description);
});
```

---

## 9. Reduce Method

```js
const total =
expenses.reduce(
  (acc, expense) => acc + expense.amount,
  0
);
```

---

## 10. Closures

```js
function createDeleteHistory() {

  let deletedItems = [];

  return {

    add(item) {
      deletedItems.push(item);
    },

    getHistory() {
      return deletedItems;
    }

  };

}
```

---

# 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)

---

# 🌐 Project Overview

The Expense Tracker application allows users to:

- Add new expenses
- Select categories
- Track total spending
- Filter expenses by category
- Delete expenses
- Maintain private delete history using closures

The project is completely built using:

- DOM Manipulation
- Functional JavaScript
- Array Methods
- Closures
- Dynamic Rendering

No frameworks like React are used.

---

# 📄 HTML Code

```html
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8">

  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

  <title>Expense Tracker</title>

  <link rel="stylesheet"
        href="../css/style.css">

</head>

<body>

<div class="container">

  <h1>💰 Expense Tracker</h1>

  <!-- Form -->

  <div class="form">

    <input type="text"
           id="description"
           placeholder="Expense Description">

    <input type="number"
           id="amount"
           placeholder="Amount">

    <select id="category">

      <option value="Food">Food</option>

      <option value="Travel">Travel</option>

      <option value="Shopping">Shopping</option>

      <option value="Bills">Bills</option>

    </select>

    <button id="addBtn">
      Add Expense
    </button>

  </div>

  <!-- Filter -->

  <div class="filter-section">

    <select id="filterCategory">

      <option value="All">
        All Categories
      </option>

      <option value="Food">
        Food
      </option>

      <option value="Travel">
        Travel
      </option>

      <option value="Shopping">
        Shopping
      </option>

      <option value="Bills">
        Bills
      </option>

    </select>

  </div>

  <!-- Totals -->

  <div class="totals">

    <h3 id="totalAmount">
      Total: ₹0
    </h3>

    <h3 id="categoryTotal">
      Category Total: ₹0
    </h3>

  </div>

  <!-- Table -->

  <table>

    <thead>

      <tr>

        <th>Description</th>

        <th>Amount</th>

        <th>Category</th>

        <th>Action</th>

      </tr>

    </thead>

    <tbody id="expenseTableBody">

    </tbody>

  </table>

</div>

<script src="../js/script.js"></script>

</body>
</html>
```

---

# 🎨 CSS Code

```css
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background: #f4f4f4;
}

.container {
  width: 90%;
  max-width: 900px;
  margin: 30px auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

/* Form */

.form {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.form input,
.form select {
  padding: 10px;
  flex: 1;
}

button {
  padding: 10px 15px;
  border: none;
  background: #333;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  opacity: 0.9;
}

/* Filter */

.filter-section {
  margin-bottom: 20px;
}

#filterCategory {
  padding: 10px;
}

/* Totals */

.totals {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

/* Table */

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background: #333;
  color: white;
}

/* Delete Button */

.deleteBtn {
  background: crimson;
}

/* Responsive */

@media(max-width: 768px) {

  .form {
    flex-direction: column;
  }

  .totals {
    flex-direction: column;
    gap: 10px;
  }

}
```

---

# ⚡ JavaScript Code

```js
/* Elements */

const descriptionInput =
document.getElementById("description");

const amountInput =
document.getElementById("amount");

const categoryInput =
document.getElementById("category");

const addBtn =
document.getElementById("addBtn");

const expenseTableBody =
document.getElementById("expenseTableBody");

const totalAmount =
document.getElementById("totalAmount");

const categoryTotal =
document.getElementById("categoryTotal");

const filterCategory =
document.getElementById("filterCategory");

/* Expense Array */

let expenses = [];

/* Closure */

function createDeleteHistory() {

  let deletedExpenses = [];

  return {

    addDeleted(expense) {
      deletedExpenses.push(expense);
    },

    getHistory() {
      return deletedExpenses;
    }

  };

}

const deleteHistory =
createDeleteHistory();

/* Add Expense */

function addExpense() {

  const description =
  descriptionInput.value.trim();

  const amount =
  Number(amountInput.value);

  const category =
  categoryInput.value;

  if (!description || !amount) {

    alert("Please fill all fields");

    return;
  }

  const newExpense = {
    id: Date.now(),
    description,
    amount,
    category
  };

  expenses = [...expenses, newExpense];

  renderExpenses(expenses);

  updateTotals();

  clearInputs();
}

/* Render Expenses */

function renderExpenses(data) {

  expenseTableBody.innerHTML = "";

  data.map((expense) => {

    const {
      id,
      description,
      amount,
      category
    } = expense;

    const row =
    document.createElement("tr");

    row.innerHTML = `
      <td>${description}</td>

      <td>₹${amount}</td>

      <td>${category}</td>

      <td>
        <button
          class="deleteBtn"
          onclick="deleteExpense(${id})">

          Delete

        </button>
      </td>
    `;

    expenseTableBody.appendChild(row);

  });

}

/* Delete Expense */

function deleteExpense(id) {

  const deletedItem =
  expenses.find(
    expense => expense.id === id
  );

  deleteHistory.addDeleted(deletedItem);

  expenses = expenses.filter(
    expense => expense.id !== id
  );

  renderExpenses(expenses);

  updateTotals();

}

/* Update Totals */

function updateTotals() {

  const total =
  expenses.reduce(

    (acc, expense) =>
      acc + expense.amount,

    0
  );

  totalAmount.innerText =
  `Total: ₹${total}`;

  const selectedCategory =
  filterCategory.value;

  const filteredExpenses =
  selectedCategory === "All"

  ? expenses

  : expenses.filter(

      expense =>
      expense.category ===
      selectedCategory
    );

  const categoryWiseTotal =
  filteredExpenses.reduce(

    (acc, expense) =>
      acc + expense.amount,

    0
  );

  categoryTotal.innerText =
  `Category Total: ₹${categoryWiseTotal}`;

}

/* Filter Expenses */

filterCategory.addEventListener(
  "change",
  () => {

    const selected =
    filterCategory.value;

    const filtered =
    selected === "All"

    ? expenses

    : expenses.filter(
        expense =>
        expense.category === selected
      );

    renderExpenses(filtered);

    updateTotals();

  }
);

/* Clear Inputs */

function clearInputs() {

  descriptionInput.value = "";

  amountInput.value = "";

}

/* Event */

addBtn.addEventListener(
  "click",
  addExpense
);
```

---

# 🔥 Functional JavaScript Concepts Implemented

## map()

Used for rendering expense rows dynamically.

```js
data.map((expense) => {
  console.log(expense);
});
```

---

## filter()

Used for category filtering.

```js
expenses.filter(
  expense => expense.category === "Food"
);
```

---

## reduce()

Used for total calculations.

```js
expenses.reduce(
  (acc, expense) =>
  acc + expense.amount,
  0
);
```

---

## find()

Used for locating deleted expense.

```js
expenses.find(
  expense => expense.id === id
);
```

---

## Closures

Used for private deletion history.

```js
const deleteHistory =
createDeleteHistory();
```

---

# 🚀 Future Improvements

- Add Local Storage
- Add Edit Expense Feature
- Add Charts & Analytics
- Add Dark Mode
- Add Monthly Expense Reports
- Add Search Feature
- Add Login Authentication
 

---

# 📌 Conclusion

This Expense Tracker project helped in understanding:

- Real-world DOM Manipulation
- Array Methods like map, filter, reduce
- Closures in JavaScript
- Dynamic UI Rendering
- Functional Programming Concepts
- ES6+ Modern JavaScript

The Expense Tracker mini project demonstrates how modern JavaScript concepts can be used together to build a practical frontend application without using frameworks like React.

This project is a strong Phase 2 Functional JavaScript mini project because it combines:

- Array Methods
- Closures
- Higher-Order Functions
- Dynamic Rendering
- Real-world UI Logic

into a single practical application.
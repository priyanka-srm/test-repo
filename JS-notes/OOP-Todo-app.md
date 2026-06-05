# 📝 Advanced OOP Todo Manager

A feature-rich Todo Management Application built using HTML, CSS, and JavaScript.

This project was developed to practice Object-Oriented Programming (OOP) concepts in JavaScript, along with DOM manipulation, Local Storage, Event Handling, and the `this` keyword.

---

# 🚀 Features

✅ Add Todo

✅ Edit Todo

✅ Delete Todo

✅ Mark Task as Complete

✅ Search Tasks

✅ Filter Tasks

- All Tasks
- Completed Tasks
- Pending Tasks

✅ Task Priority

- High
- Medium
- Low

✅ Due Date Support

✅ Task Statistics

- Total Tasks
- Completed Tasks
- Pending Tasks
- Completion Percentage

✅ Local Storage Persistence

✅ Dark Mode Toggle

✅ Empty State UI

✅ Responsive Design

---

# 🧠 OOP Concepts Used

## 1. Classes

```js
class Todo {

  constructor(
    id,
    title,
    priority,
    dueDate
  ) {

    this.id = id;
    this.title = title;
    this.priority = priority;
    this.dueDate = dueDate;

  }

}
```

---

## 2. Constructor

```js
constructor(
  id,
  title,
  priority,
  dueDate
) {

  this.id = id;
  this.title = title;
  this.priority = priority;
  this.dueDate = dueDate;

}
```

---

## 3. Methods

```js
toggleStatus() {

  this.completed =
    !this.completed;

}
```

---

## 4. Inheritance

```js
class ImportantTodo extends Todo {

  constructor(
    id,
    title,
    priority,
    dueDate,
    completed
  ) {

    super(
      id,
      title,
      priority,
      dueDate,
      completed
    );

    this.important = true;

  }

}
```

---

## 5. Static Methods

```js
class StorageManager {

  static save(todos) {

    localStorage.setItem(
      "todos",
      JSON.stringify(todos)
    );

  }

}
```

---

# 🎯 this Keyword Usage

The project uses the `this` keyword extensively inside classes.

```js
this.todos

this.render()

this.taskInput

this.priority
```

Example:

```js
handleAddTodo() {

  const todo =
    this.createTodo();

  this.todos.push(todo);

  this.render();

}
```

---

# 🔗 bind() Usage

```js
this.handleAddTodo =
this.handleAddTodo.bind(this);
```

Without bind:

```js
button.addEventListener(
  "click",
  this.handleAddTodo
);
```

`this` becomes the button element.

With bind:

```js
button.addEventListener(
  "click",
  this.handleAddTodo
);
```

`this` correctly refers to the TodoList instance.

---

# 📞 call() Usage

```js
Todo.prototype
.showInfo
.call(todo);
```

---

# 📦 apply() Usage

```js
Todo.prototype
.showInfo
.apply(
  todo,
  []
);
```

---

# 💾 Local Storage

Tasks are stored using browser Local Storage.

Save Data:

```js
localStorage.setItem(
  "todos",
  JSON.stringify(todos)
);
```

Load Data:

```js
JSON.parse(
  localStorage.getItem("todos")
);
```

---

# 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Local Storage API

---

# 📚 Concepts Practiced

- Classes
- Constructors
- Methods
- Inheritance
- Static Methods
- this Keyword
- bind()
- call()
- apply()
- DOM Manipulation
- Event Handling
- Local Storage
- Arrays
- Objects
- Template Literals
- Filter Method
- Map Method

---

# 🚀 Future Improvements

- Drag and Drop Tasks
- Task Categories
- Notifications
- Task Reminders
- Sorting by Priority
- Sorting by Due Date
- Multiple Todo Lists
- User Authentication

---

# 📌 Conclusion

The Advanced OOP Todo Manager project demonstrates how Object-Oriented Programming can be used to build scalable and maintainable JavaScript applications.

This project provided hands-on experience with Classes, Inheritance, the `this` keyword, `bind()`, `call()`, `apply()`, Local Storage, and dynamic DOM manipulation.

It serves as a practical implementation of Phase 4 concepts and prepares developers for larger frontend applications and technical interviews.
class Todo {

  constructor(
    id,
    title,
    priority,
    dueDate,
    completed = false
  ) {

    this.id = id;
    this.title = title;
    this.priority = priority;
    this.dueDate = dueDate;
    this.completed = completed;

  }

  toggleStatus() {

    this.completed =
      !this.completed;

  }

  updateTitle(newTitle) {

    this.title = newTitle;

  }

  showInfo() {

    return `
      ${this.title}
      (${this.priority})
    `;

  }

}

class ImportantTodo
extends Todo {

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

class StorageManager {

  static save(todos) {

    localStorage.setItem(
      "todos",
      JSON.stringify(todos)
    );

  }

  static load() {

    return JSON.parse(
      localStorage.getItem("todos")
    ) || [];

  }

}

class TodoList {

  constructor() {

    this.todos = [];

    this.todoList =
      document.getElementById(
        "todoList"
      );

    this.taskInput =
      document.getElementById(
        "taskInput"
      );

    this.priority =
      document.getElementById(
        "priority"
      );

    this.dueDate =
      document.getElementById(
        "dueDate"
      );

    this.searchInput =
      document.getElementById(
        "searchInput"
      );

    this.filterSelect =
      document.getElementById(
        "filterSelect"
      );

    this.emptyState =
      document.getElementById(
        "emptyState"
      );

    this.handleAddTodo =
      this.handleAddTodo.bind(this);

    this.handleSearch =
      this.handleSearch.bind(this);

    this.handleFilter =
      this.handleFilter.bind(this);

    this.loadTodos();

    this.init();

  }

  init() {

    document
      .getElementById("addBtn")
      .addEventListener(
        "click",
        this.handleAddTodo
      );

    this.searchInput
      .addEventListener(
        "input",
        this.handleSearch
      );

    this.filterSelect
      .addEventListener(
        "change",
        this.handleFilter
      );

    document
      .getElementById("themeBtn")
      .addEventListener(
        "click",
        () => {

          document.body
            .classList
            .toggle("dark");

        }
      );

  }

  createTodo() {

    const title =
      this.taskInput.value.trim();

    const priority =
      this.priority.value;

    const dueDate =
      this.dueDate.value;

    if (!title) {

      alert(
        "Enter task"
      );

      return null;

    }

    const id =
      Date.now();

    if (
      priority === "High"
    ) {

      return new ImportantTodo(
        id,
        title,
        priority,
        dueDate
      );

    }

    return new Todo(
      id,
      title,
      priority,
      dueDate
    );

  }

  handleAddTodo() {

    const todo =
      this.createTodo();

    if (!todo) return;

    this.todos.push(todo);

    StorageManager.save(
      this.todos
    );

    this.render();

    this.taskInput.value =
      "";

    this.dueDate.value =
      "";

  }

  deleteTodo(id) {

    this.todos =
      this.todos.filter(
        todo =>
          todo.id !== id
      );

    StorageManager.save(
      this.todos
    );

    this.render();

  }

  editTodo(id) {

    const todo =
      this.todos.find(
        todo =>
          todo.id === id
      );

    const newTitle =
      prompt(
        "Edit Task",
        todo.title
      );

    if (!newTitle)
      return;

    todo.updateTitle(
      newTitle
    );

    StorageManager.save(
      this.todos
    );

    this.render();

  }

  toggleTodo(id) {

    const todo =
      this.todos.find(
        todo =>
          todo.id === id
      );

    todo.toggleStatus();

    StorageManager.save(
      this.todos
    );

    this.render();

  }

  handleSearch() {

    const text =
      this.searchInput
      .value
      .toLowerCase();

    const filtered =
      this.todos.filter(
        todo =>
          todo.title
          .toLowerCase()
          .includes(text)
      );

    this.render(
      filtered
    );

  }

  handleFilter() {

    const value =
      this.filterSelect
      .value;

    if (
      value === "all"
    ) {

      this.render();

      return;

    }

    const filtered =
      this.todos.filter(
        todo =>

          value ===
          "completed"

            ? todo.completed

            : !todo.completed
      );

    this.render(
      filtered
    );

  }

  updateStats() {

    const total =
      this.todos.length;

    const completed =
      this.todos.filter(
        todo =>
          todo.completed
      ).length;

    const pending =
      total - completed;

    const percent =
      total === 0
        ? 0
        : Math.round(
            (
              completed /
              total
            ) * 100
          );

    document
      .getElementById(
        "totalTasks"
      )
      .textContent =
      total;

    document
      .getElementById(
        "completedTasks"
      )
      .textContent =
      completed;

    document
      .getElementById(
        "pendingTasks"
      )
      .textContent =
      pending;

    document
      .getElementById(
        "progressPercent"
      )
      .textContent =
      percent + "%";

  }

  render(
    data = this.todos
  ) {

    this.todoList
      .innerHTML = "";

    this.emptyState
      .style.display =
      data.length === 0
        ? "block"
        : "none";

    data.forEach(
      todo => {

        Todo.prototype
          .showInfo
          .call(todo);

        Todo.prototype
          .showInfo
          .apply(
            todo,
            []
          );

        const li =
          document.createElement(
            "li"
          );

        li.className =
          `
          todo-item
          ${
            todo.completed
            ? "completed"
            : ""
          }
        `;

        li.innerHTML = `
          <div class="todo-left">

            <div
              class="todo-title"
            >
              ${todo.title}
            </div>

            <div
              class="todo-meta
              priority-${todo.priority.toLowerCase()}"
            >

              Priority:
              ${todo.priority}

              <br>

              Due:
              ${
                todo.dueDate ||
                "No Date"
              }

            </div>

          </div>

          <div class="actions">

            <button
              class="complete-btn"
            >
              ✔
            </button>

            <button
              class="edit-btn"
            >
              ✏
            </button>

            <button
              class="delete-btn"
            >
              🗑
            </button>

          </div>
        `;

        const completeBtn =
          li.querySelector(
            ".complete-btn"
          );

        const editBtn =
          li.querySelector(
            ".edit-btn"
          );

        const deleteBtn =
          li.querySelector(
            ".delete-btn"
          );

        completeBtn
          .addEventListener(
            "click",
            () => {

              this.toggleTodo(
                todo.id
              );

            }
          );

        editBtn
          .addEventListener(
            "click",
            () => {

              this.editTodo(
                todo.id
              );

            }
          );

        deleteBtn
          .addEventListener(
            "click",
            () => {

              this.deleteTodo(
                todo.id
              );

            }
          );

        this.todoList
          .appendChild(
            li
          );

      }
    );

    this.updateStats();

  }

  loadTodos() {

    const saved =
      StorageManager
      .load();

    this.todos =
      saved.map(
        todo =>
          new Todo(
            todo.id,
            todo.title,
            todo.priority,
            todo.dueDate,
            todo.completed
          )
      );

    this.render();

  }

}

new TodoList();
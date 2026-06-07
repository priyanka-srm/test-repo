class Task {

  constructor(
    id,
    title,
    priority,
    dueDate,
    status = "todo"
  ) {

    this.id = id;
    this.title = title;
    this.priority = priority;
    this.dueDate = dueDate;
    this.status = status;

  }

}

class StorageManager {

  static KEY = "kanbanTasks";

  static save(tasks) {

    try {

      localStorage.setItem(
        this.KEY,
        JSON.stringify(tasks)
      );

    } catch (error) {

      console.error(
        "Save Error:",
        error
      );

    }

  }

  static load() {

    try {

      const data =
        JSON.parse(
          localStorage.getItem(this.KEY)
        ) || [];

      return data.map(task =>
        new Task(
          task.id,
          task.title,
          task.priority,
          task.dueDate,
          task.status
        )
      );

    } catch (error) {

      console.error(
        "Load Error:",
        error
      );

      return [];

    }

  }

}

class KanbanBoard {

  constructor() {

    this.tasks =
      StorageManager.load();

    this.editingTaskId = null;

    this.taskForm =
      document.getElementById("taskForm");

    this.searchInput =
      document.getElementById("searchInput");

    this.board =
      document.querySelector(".board");

    this.themeToggle =
      document.getElementById("themeToggle");

    this.bindMethods();

    this.attachEvents();

    this.loadTheme();

    this.render();

  }

  bindMethods() {

    this.handleAddTask =
      this.handleAddTask.bind(this);

  }

  attachEvents() {

    this.taskForm.addEventListener(
      "submit",
      this.handleAddTask
    );

    this.searchInput.addEventListener(
      "input",
      () => this.render()
    );

    this.board.addEventListener(
      "click",
      (e) => this.handleBoardClick(e)
    );

    this.themeToggle.addEventListener(
      "click",
      () => this.toggleTheme()
    );

    document
      .getElementById("saveEdit")
      .addEventListener(
        "click",
        () => this.saveEdit()
      );

    document
      .getElementById("cancelEdit")
      .addEventListener(
        "click",
        () => this.closeModal()
      );

    this.enableDragAndDrop();

  }

  handleAddTask(e) {

    e.preventDefault();

    const title =
      document
      .getElementById("taskTitle")
      .value
      .trim();

    const priority =
      document
      .getElementById("taskPriority")
      .value;

    const dueDate =
      document
      .getElementById("taskDueDate")
      .value;

    if (!title) return;

    const task =
      new Task(
        Date.now(),
        title,
        priority,
        dueDate
      );

    this.tasks.push(task);

    StorageManager.save(this.tasks);

    this.taskForm.reset();

    this.render();

  }

  handleBoardClick(e) {

    const card =
      e.target.closest(".task-card");

    if (!card) return;

    const taskId =
      Number(card.dataset.id);

    if (
      e.target.classList.contains(
        "delete-btn"
      )
    ) {

      e.stopPropagation();

      this.deleteTask(taskId);

    }

    if (
      e.target.classList.contains(
        "edit-btn"
      )
    ) {

      e.stopPropagation();

      this.openEditModal(taskId);

    }

  }

  deleteTask(id) {

    this.tasks =
      this.tasks.filter(
        task => task.id !== id
      );

    StorageManager.save(this.tasks);

    this.render();

  }

  openEditModal(id) {

    const task =
      this.tasks.find(
        task => task.id === id
      );

    if (!task) return;

    this.editingTaskId = id;

    document
      .getElementById("editTitle")
      .value = task.title;

    document
      .getElementById("editPriority")
      .value = task.priority;

    document
      .getElementById("editDueDate")
      .value = task.dueDate;

    document
      .getElementById("editModal")
      .classList.remove("hidden");

  }

  saveEdit() {

    const task =
      this.tasks.find(
        task =>
          task.id === this.editingTaskId
      );

    if (!task) return;

    task.title =
      document
      .getElementById("editTitle")
      .value;

    task.priority =
      document
      .getElementById("editPriority")
      .value;

    task.dueDate =
      document
      .getElementById("editDueDate")
      .value;

    StorageManager.save(this.tasks);

    this.closeModal();

    this.render();

  }

  closeModal() {

    document
      .getElementById("editModal")
      .classList.add("hidden");

  }

  updateStats() {

    document.getElementById(
      "totalTasks"
    ).textContent =
      this.tasks.length;

    document.getElementById(
      "todoCount"
    ).textContent =
      this.tasks.filter(
        t => t.status === "todo"
      ).length;

    document.getElementById(
      "progressCount"
    ).textContent =
      this.tasks.filter(
        t => t.status === "progress"
      ).length;

    document.getElementById(
      "doneCount"
    ).textContent =
      this.tasks.filter(
        t => t.status === "done"
      ).length;

  }

  createTaskCard(task) {

    return `
      <div
        class="task-card ${task.priority.toLowerCase()}"
        draggable="true"
        data-id="${task.id}"
      >

        <h3 class="task-title">
          ${task.title}
        </h3>

        <p class="task-priority">
          Priority:
          ${task.priority}
        </p>

        <p class="task-date">
          Due:
          ${task.dueDate}
        </p>

        <div class="task-actions">

          <button
            class="edit-btn"
          >
            Edit
          </button>

          <button
            class="delete-btn"
          >
            Delete
          </button>

        </div>

      </div>
    `;

  }

  render() {

    const search =
      this.searchInput.value
      .toLowerCase();

    const filtered =
      this.tasks.filter(task =>
        task.title
        .toLowerCase()
        .includes(search)
      );

    const todo =
      document.getElementById(
        "todoColumn"
      );

    const progress =
      document.getElementById(
        "progressColumn"
      );

    const done =
      document.getElementById(
        "doneColumn"
      );

    todo.innerHTML = "";
    progress.innerHTML = "";
    done.innerHTML = "";

    filtered.forEach(task => {

      const html =
        this.createTaskCard(task);

      if (task.status === "todo") {
        todo.innerHTML += html;
      }

      else if (
        task.status === "progress"
      ) {
        progress.innerHTML += html;
      }

      else {
        done.innerHTML += html;
      }

    });

    this.updateStats();

    this.enableDragAndDrop();

  }

  enableDragAndDrop() {

    document
      .querySelectorAll(".task-card")
      .forEach(card => {

        card.addEventListener(
          "dragstart",
          () => {

            card.classList.add(
              "dragging"
            );

          }
        );

        card.addEventListener(
          "dragend",
          () => {

            card.classList.remove(
              "dragging"
            );

          }
        );

      });

    document
      .querySelectorAll(".task-container")
      .forEach(container => {

        container.addEventListener(
          "dragover",
          (e) => {

            e.preventDefault();

          }
        );

        container.addEventListener(
          "drop",
          (e) => {

            e.preventDefault();

            const dragged =
              document.querySelector(
                ".dragging"
              );

            if (!dragged) return;

            const taskId =
              Number(
                dragged.dataset.id
              );

            const task =
              this.tasks.find(
                t => t.id === taskId
              );

            if (!task) return;

            if (
              container.id ===
              "todoColumn"
            ) {
              task.status = "todo";
            }

            if (
              container.id ===
              "progressColumn"
            ) {
              task.status =
                "progress";
            }

            if (
              container.id ===
              "doneColumn"
            ) {
              task.status = "done";
            }

            StorageManager.save(
              this.tasks
            );

            this.render();

          }
        );

      });

  }

  toggleTheme() {

    document.body.classList.toggle(
      "dark"
    );

    localStorage.setItem(
      "theme",
      document.body.classList.contains(
        "dark"
      )
    );

  }

  loadTheme() {

    const dark =
      localStorage.getItem(
        "theme"
      ) === "true";

    if (dark) {

      document.body.classList.add(
        "dark"
      );

    }

  }

}

new KanbanBoard();
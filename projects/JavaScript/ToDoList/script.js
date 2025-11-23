const elements = {
  input: document.querySelector(".todo-input"),
  addBtn: document.querySelector(".todo-add-btn"),
  activeList: document.querySelector(".todo-list"),
  doneList: document.querySelector(".done-list"),
};

let tasks = [];

const todo = {
  load() {
    const saved = localStorage.getItem("todo");
    if (saved) {
      tasks = JSON.parse(saved);
      this.render();
    }
  },

  save() {
    localStorage.setItem("todo", JSON.stringify(tasks));
  },

  add() {
    const text = elements.input.value.trim();

    if (!text.length) return;

    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    tasks.push(newTask);
    this.save();
    this.render();
    elements.input.value = "";
  },

  complete(id) {
    const task = tasks.find((t) => t.id === id);

    if (task) {
      task.completed = true;
      this.save();
      this.render();
    }
  },

  delete(id) {
    tasks = tasks.filter((t) => t.id !== id);
    this.save();
    this.render();
  },

  createTaskHTML(task) {
    return `
        <li data-id="${task.id}" class="todo-item">
            <p>${task.text}</p>
            <div class="task-actions">
                <button class="todo-btn-done" type="button">✓</button>
                <button class="todo-btn-delete" type="button">🗑️</button>
            </div>
        </li>
    `;
  },

  render() {
    elements.activeList.innerHTML = "";
    elements.doneList.innerHTML = "";

    const activeTasks = tasks.filter((t) => !t.completed); //true
    const doneTasks = tasks.filter((t) => t.completed); //false

    activeTasks.forEach((task) => {
      elements.activeList.insertAdjacentHTML(
        "beforeend",
        this.createTaskHTML(task)
      );
    });

    doneTasks.forEach((task) => {
      elements.doneList.insertAdjacentHTML(
        "beforeend",
        `<li data-id="${task.id}">
            <p><s>${task.text}</s></p>
          </li>`
      );
    });

    this.bindEvents();
  },

  bindEvents() {
    document.querySelectorAll(".todo-btn-done").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.closest("li").dataset.id);
        this.complete(id);
      });
    });

    document.querySelectorAll(".todo-btn-delete").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.closest("li").dataset.id);
        this.delete(id);
      });
    });
  },

  init() {
    elements.addBtn.addEventListener("click", () => {
      this.add();
    });

    elements.input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.add();
      }
    });

    this.load();
  },
};

todo.init();

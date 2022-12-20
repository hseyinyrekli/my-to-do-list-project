const todoButton = document.querySelector(".todo-button");
const todoInput = document.querySelector(".todo-input");
const clearAll = document.querySelector(".clearAllTodos");
const selectElement = document.querySelector(".selectOption");
const todoList = document.querySelector(".todo-list");

eventLists();
function eventLists() {
  todoButton.addEventListener("click", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  todoList.addEventListener("click", deleteCheck);
  clearAll.addEventListener("click", deleteAll);
}

function deleteAll() {
  while (todoList.firstElementChild != null) {
    todoList.firstChild.remove();
  }
  localStorage.removeItem("todos");
}
//TODOLARI STORAGE EKLEME
function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//TODOLARI STORAGEDEN ARAYÜZE YÜKLEME
function loadAllTodosToUI() {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}
//TODOLARI STORAGEDEN SİLME
function deleteTodosFromStorage(todo) {
  let todos;

  // check if the local storage is empty
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }

  // if not empty then get the item which are list of strings,
  // the parse them into a JSON array file
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // console.log(todo);
  const todoEntry = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoEntry), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//TODO EKLEME
function addTodo(e) {
  let todos = getTodosFromStorage();
  const newTodo = todoInput.value.trim();
  let isThere = false;
  todos.forEach(function (item) {
    if (item.indexOf(newTodo) != -1) {
      isThere = true;
    }
  });

  if (newTodo === "") {
    confirm("Please Enter a Todo!");
  } else if (isThere) {
    confirm("This Todo Is Already Registered!");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
  }

  e.preventDefault();
}
function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    todo.classList.add("fall");

    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function addTodoToUI(newTodo) {
  //CREATE DİV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //CREATE Lİ
  const entryTodo = document.createElement("li");
  entryTodo.innerText = newTodo;
  entryTodo.classList.add("todo-item");
  todoDiv.appendChild(entryTodo);

  //CREATE CHECK BUTTON
  const completeButton = document.createElement("button");
  completeButton.classList.add("complete-btn");
  completeButton.innerHTML = "<i class='fa fa-check'></i>";
  todoDiv.appendChild(completeButton);
  //CREATE TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-btn");
  trashButton.innerHTML = "<i class='fa fa-trash-o'></i>";
  todoDiv.appendChild(trashButton);

  //ADD ALL ELEMENT PARENT UL
  todoList.appendChild(todoDiv);
  todoList.value = "";
}

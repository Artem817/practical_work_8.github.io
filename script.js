const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let todos = [];

function newTodo() {
  const newTaskName = prompt("Please enter the new task:");
  if (!newTaskName) return;

  const newTask = {
    id: todos.length + 1, 
    name: newTaskName,
    completed: false
  };

  todos.push(newTask);  
  render();  
}

function renderTodo(task) {
  return `<li class="list-group-item">
    <input type="checkbox" class="form-check-input me-2" id="task-${task.id}" ${task.completed ? 'checked' : ''} onclick="checkTodo(${task.id})"/>
    <label for="task-${task.id}"><span class="${task.completed ? 'text-success text-decoration-line-through' : ''}">${task.name}</span></label>
    <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${task.id})">delete</button>
  </li>`;
}

function render() {
  list.innerHTML = '';   
  todos.forEach(task => {
    const taskHtml = renderTodo(task);
    list.insertAdjacentHTML('beforeend', taskHtml);  
  });
  updateCounters();  
}

function updateCounters() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(task => !task.completed).length;
}

function deleteTodo(taskId) {
  todos = todos.filter(task => task.id !== taskId);
  render();
}

function checkTodo(taskId) {
  const task = todos.find(task => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
    render();
  }
}
let listContainer = document.getElementById('list-container');
let inputBox = document.getElementById('input-box');

function addTask() {
    if (inputBox.value === '') {
        alert('Please enter a task');
    } else {
        let task = document.createElement('li');
        task.textContent = inputBox.value;
        task.addEventListener('dblclick', editTask);
        
        let span = document.createElement('span');
        span.textContent = "\u00d7";
        span.onclick = deleteTask;
        task.appendChild(span);

        listContainer.appendChild(task);
        inputBox.value = '';
        saveData();
    }
}

function editTask(e) {
    let task = e.target;
    let newTask = prompt("Edit task:", task.firstChild.textContent);
    if (newTask) {
        task.firstChild.textContent = newTask;
        saveData();
    }
}

function deleteTask(e) {
    let task = e.target.parentElement;
    listContainer.removeChild(task);
    saveData();
}

listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    let tasks = listContainer.querySelectorAll('li');
    tasks.forEach(task => task.addEventListener('dblclick', editTask));
}

showTask();

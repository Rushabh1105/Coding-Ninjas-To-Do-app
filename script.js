
const taskInput = document.querySelector('.card-input input');
const submit = document.querySelector('#submit');
const tasks = document.querySelector('.tasks');
const completeall = document.querySelector('.completeAll');
const clearComplete = document.querySelector('.clearComplete');
const allTasks = document.querySelector('#all');
const uncomplete = document.querySelector('#uncomplete');
const complete = document.querySelector('#complete');
const pendingTask = document.querySelector('.pending-task');



showTasks('all');

taskInput.addEventListener('keyup', (e) => {
    let task = taskInput.value.trim();

    if( task != 0 ){
        submit.style.display = "block";
    }else{
        submit.style.display = "none";
    }

    if(e.key == 'Enter' && task ){
        var todoList = JSON.parse(localStorage.getItem('todo-list'));
        if(!todoList){
            todoList = [];
        }
        
        let taskDetails = {name: task, status: "Pending"};
        todoList.push(taskDetails);
        localStorage.setItem("todo-list", JSON.stringify(todoList));
        showTasks('all');
        taskInput.value = '';
    }
});

submit.onclick = () =>{
    if(taskInput.value.trim() == '' ){
        return;
    }

    var todoList = JSON.parse(localStorage.getItem('todo-list'));
    if(!todoList){
        todoList = [];
    }
        
    let taskDetails = {name: taskInput.value.trim(), status: "Pending"};
    todoList.push(taskDetails);
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    showTasks('all');
    taskInput.value = ''
    
}

function showTasks(filter){
    let lists = "";
    var todoList = JSON.parse(localStorage.getItem('todo-list'));
    
    if(todoList == null){
        lists = "No task to show"
        return lists;
    }

    let len = 0;
    todoList.forEach((elem, idx) => {
        let isComplete = elem.status === "Complete" ? "complete" : "";
        let checked = elem.status === "Complete" ? "checked" : "";
        if(elem.status === "Pending"){
            len++;
        }

        if(filter == elem.status || filter == 'all'){
            lists += `<li class="task">
                        <label for="${idx}">
                            <input id=${idx} class="taskinput" type="checkbox" onclick="updateStatus(${idx})" ${checked} >
                            <span class="${isComplete}">${elem.name}</span>
                        </label>
                        <span class="remove">
                            <i class="fa-solid fa-xmark" onclick="deleteTask(${idx})"></i>
                        <span>
                    </li>`
        }
    });
    tasks.innerHTML = lists;
    submit.style.display = "none";
    pendingTask.textContent = len || '0';
}

function deleteTask(idx) {
    var todoList = JSON.parse(localStorage.getItem('todo-list'));
    if(todoList == null){
        return;
    }

    todoList.splice(idx, 1);
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    showTasks('all');
}

completeall.onclick = () => {
    var todoList = [];
    localStorage.setItem("todo-list", JSON.stringify(todoList) );
    showTasks();
}

clearComplete.onclick = () => {
    var todoList = JSON.parse(localStorage.getItem('todo-list'));
    if(todoList == null){
        return;
    }

    todoList.forEach((elem, idx) => {
        if(elem.status == "Complete"){
            todoList.splice(idx, 1);
        }
    });

    localStorage.setItem("todo-list", JSON.stringify(todoList) );

    showTasks('all');
}


function updateStatus(idx){
    var todoList = JSON.parse(localStorage.getItem('todo-list'));
    var inputTask = document.querySelector('.taskinput');
    if(todoList == null){
        return;
    }
    todoList[idx].status = "Complete";
    
    localStorage.setItem("todo-list", JSON.stringify(todoList) );
} 

uncomplete.onclick = () => {
    showTasks('Pending');
}

complete.onclick = () => {
    showTasks('Complete');
}

allTasks.onclick = () => {
    showTasks('all');
}
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

/* LOAD TASKS */

function loadTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if(currentFilter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if(currentFilter === "done") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.classList.add("fade-in");

        li.innerHTML = `
        
            <span 
            onclick="toggleTask(${index})"
            style="
            text-decoration:${task.completed ? "line-through" : "none"};
            cursor:pointer;
            ">
                ${task.text}
            </span>

            <button 
            class="delete-btn"
            onclick="deleteTask(${index})">
                Delete
            </button>

        `;

        taskList.appendChild(li);

    });

    updateProgress();
}

/* ADD TASK */

function addTask() {

    const input = document.getElementById("taskInput");

    const text = input.value.trim();

    if(text === "") return;

    tasks.push({
        text:text,
        completed:false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";

    loadTasks();
}

/* DELETE */

function deleteTask(index) {

    tasks.splice(index,1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();
}

/* TOGGLE */

function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();
}

/* FILTER */

function filterTasks(type) {

    currentFilter = type;

    document.querySelectorAll(".filter").forEach(btn => {
        btn.classList.remove("active");
    });

    event.target.classList.add("active");

    loadTasks();
}

/* PROGRESS */

function updateProgress() {

    const done = tasks.filter(task => task.completed).length;

    const percent = tasks.length
        ? (done / tasks.length) * 100
        : 0;

    document.getElementById("progressFill").style.width =
        percent + "%";

    document.getElementById("progressText").innerText =
        Math.round(percent) + "% Completed";
}

/* INITIAL LOAD */

loadTasks();
function login(){

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

        alert("Login Successful");

        window.location.href =
        "dashboard.html";

    }{

        alert("Invalid Email or Password");

    }
    function register(){

    const email =
    document.getElementById("regEmail").value;

    const password =
    document.getElementById("regPassword").value;

    const contact =
    document.getElementById("regContact").value;

    if(email === "" ||
       password === "" ||
       contact === ""){

        alert("Please fill all fields");

        return;
    }

    alert("Registration Successful");

}
const formPattern = /form.html$/i;
const indexPattern = /index.html$/i;
let tasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
let showBtn ="";
if (formPattern.test(window.location)) {
    formFunc();
}



function formFunc() {

    const back = document.getElementById("back");
    const add = document.getElementById("add");
    back.onclick = () => location.href = 'index.html';
    add.onclick = () => {
        const title = document.getElementById("title").value;
        const date = document.getElementById("date").value;

        if (title && date) {
            const v = validateDate(date);
            if (v) {
                tasks.push({ title: title, date: date, status: 'unchecked', isDeleted: false })
                localStorage.setItem("tasks", JSON.stringify(tasks))
                location.href = 'index.html';
            }
            else {
                console.log("any")
                const error = document.getElementById('error');
                error.style.display = "flex";
                const p = document.createElement("p");
                p.innerHTML = "You can't choose this date. Invalid Date."
                error.appendChild(p);
            }
        } else {
            const error = document.getElementById('error');
            error.style.display = "flex";
            const p = document.createElement("p");
            p.innerHTML = "You have to Enter all fields."
            error.appendChild(p);
        }

    }


}

function indexFunc() {
    
    for (let i = 0; i < tasks.length; i++) {
        if (i < 3) {
            renderTaskTable(tasks[i], i);
        } else {
            break;
        }
    }
    if (tasks.length !== 0 && tasks.length > 3){
        const container = document.getElementById("container");
        container.innerHTML += `<div class="SeeMore" id="SeeMore">
            <button class="moreBtn" id="moreBtn" onclick="showAll()">
            See More
            </button>
        </div>`;
    }

}

function showAll(){
    const SeeMore = document.getElementById("SeeMore");
    SeeMore.style.display = "none";
    // SeeMore.display = "none!important";
    console.log(SeeMore);
    for (let i = 3; i < tasks.length; i++) {
            renderTaskTable(tasks[i], i);
}
    const container = document.getElementById("container");
    container.innerHTML += `<div class="SeeLess" id="SeeLess">
            <button class="lessBtn" id="lessBtn" onclick="location.reload()">
            See Less
            </button>
        </div>`;
}

function renderTaskTable(task, i) {
    const container = document.getElementById("container");
    container.innerHTML += `<div id="task${i}" class=${task.isDeleted === true ? `deleted` : ``}>
        <input type="checkbox" name="status" id="checkBoxStatus${i}" onclick="updateStatus(${i})" 
        ${task.status === 'checked' ? 'checked' : ''}
        ${task.isDeleted === true ? 'disabled' : ""}>
        <div class="date">${task.date}</div>
        <div class="title">${task.title}</div>
        <div class="btn" onclick="deleteTask(${i})"><button>X</button></div>
        ${task.status === 'checked' ? `<div id="status${i}" class="checked" style="visibility:visible;" ></div>` :
            `<div id='status${i}' style="visibility:hidden;"></div>`}
    </div>`;
}
function updateStatus(i) {
    const checkbox = document.getElementById(`checkBoxStatus${i}`);
    const check = document.getElementById(`status${i}`);
    // checkbox.setAttribute("checked","");
    check.classList.toggle("checked");
    check.style.visibility = "visible";
    tasks[i].status = tasks[i].status === 'checked' ? 'unchecked' : 'checked';
    localStorage.setItem("tasks", JSON.stringify(tasks));

}
function deleteTask(i) {
    const task = document.getElementById(`task${i}`);
    task.classList.add("deleted");
    const checkbox = document.getElementById(`checkBoxStatus${i}`);
    checkbox.setAttribute("disabled", "");
    tasks[i].isDeleted = true;
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function validateDate(date) {
    let d = new Date();
    d = Date.now();
    let dt = new Date(date);
    if (dt - d <= 0) {
        return false
    }
    return true
}
const addBtn = document.getElementById("addBtn");
addBtn.onclick = () => location.href = 'form.html';
indexFunc();
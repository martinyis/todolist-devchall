console.log("helo");

//=======================================================================VARIABELS==========================================================================//
// TASK CONTAINERS======================================================================================================
const todoTaskBox = document.querySelectorAll(".todo__taskbox");
const taskBoxActive = document.querySelector(".task-active");
const taskBoxCompleted = document.querySelector(".taskbox-completed");
const taskBoxAll = document.querySelector(".task-all");
//ID VERSION======================================================================================================
const todoBoxAllId = document.getElementById("taskbox-all");
const todoBoxActiveId = document.getElementById("taskbox-active");
const todoBoxCompletedId = document.getElementById("taskbox-completed");

// FIELD OF INPUT AND BUTTON===================================/===================================================================
const form = document.querySelector(".todo__form");
const todoInput = document.querySelector(".todo__input");
const todoButton = document.querySelector(".todo__btn");

// BARS======================================================================================================
const todoItem1 = document.querySelectorAll(".item-01");
const todoItem2 = document.querySelectorAll(".item-02");
const todoItem3 = document.querySelectorAll(".item-03");
const todoItem = document.querySelectorAll(".todo__item");
const todoList = document.querySelector(".todo__list");

// GENERAL VARIABLES======================================================================================================
const textTask = document.querySelector(".todo__text");
const itemBars = Array.from(todoItem);
const taskCont = Array.from(todoTaskBox);

// TASKS==============================================================================================================================================
const allTask = document.querySelector(".task-all");
const activeTask = document.querySelector(".task-active");
const completeTask = document.querySelector(".task-completed");

//DElETE TASKS======================================================================================================
const trashCan = document.querySelector(".todo__trashcan");
const deleteBtn = document.querySelector(".todo__delete");

//==============================================================EVENTLISTENERS====================================================================//
const changeActiveContainer = function () {
  todoList.addEventListener("click", function (e) {
    const clicked = e.target;
    if (clicked.classList.contains("todo__item")) {
      todoItem.forEach(function (item) {
        item.classList.remove("item-active");
      });
      e.target.classList.add("item-active");
    }
    if (clicked.classList.contains("item-03")) {
      form.style.display = "none";
    } else if (
      clicked.classList.contains("item-02") ||
      clicked.classList.contains("item-01")
    ) {
      form.style.display = "block";
    }
    todoTaskBox.forEach((item) => {
      const clicked = e.target;
      item.classList.add("hidden-box");
      if (itemBars[0].classList.contains("item-active")) {
        taskCont[0].classList.remove("hidden-box");
      } else if (itemBars[1].classList.contains("item-active")) {
        taskCont[1].classList.remove("hidden-box");
      } else if (itemBars[2].classList.contains("item-active")) {
        taskCont[2].classList.remove("hidden-box");
      }
    });
  });
};
const deleteTask = function () {
  deleteBtn.addEventListener("click", function (e) {
    const clicked = e.target;
    const completeItems = Array.from(todoBoxCompletedId.children);
    completeItems.forEach(function (item) {
      if (item.classList.contains("todo__task")) {
        item.remove();
      }
    });
  });
  taskBoxCompleted.addEventListener("click", function (e) {
    const clicked = e.target;
    const clickedParent = e.target.parentElement;
    console.log(clickedParent);
    if (clickedParent.classList.contains("todo__trash")) {
      clickedParent.parentElement.remove();
    }
  });
};

//ADDING TASKS======================================================================================================
todoButton.addEventListener("click", function (e) {
  e.preventDefault();
  const randomClass = `todo-task-${Math.floor(Math.random() * 100000)}`;
  const value = todoInput.value;
  const task = `<div class="todo__task ${randomClass}">
      <div class="todo__check"></div>
      <div class="todo__text">
        ${value}
      </div>
    </div>`;
  const task2 = `<div class="todo__task task-active ${randomClass}">
      <div class="todo__check"></div>
      <div class="todo__text">
        ${value}
      </div>
    </div>`;
  if (value !== "") {
    todoBoxAllId.insertAdjacentHTML("beforeend", task);
    todoBoxActiveId.insertAdjacentHTML("beforeend", task2);
  }
  todoInput.value = "";
});

todoBoxActiveId.addEventListener("click", function (e) {
  //Declaring variables
  const clicked = e.target;
  const classes = clicked.parentElement.classList;
  const lastClass = classes[classes.length - 1];
  const allTasksArr = Array.from(todoBoxAllId.children);
  const findedElem = allTasksArr.find((item) => {
    return item.classList.contains(lastClass);
  });
  //Remove element from all tasks
  if (clicked.classList.contains("todo__check")) {
    clicked.parentElement.style.display = "none";
    findedElem.style.textDecoration = "line-through";
  }
  //Change style of done task

  //Add to elemnt blue check
  findedElem.firstElementChild.classList.add("done-check");
  //Setting id to elemnt
  findedElem.setAttribute("id", `${lastClass}`);
  const elemWithTrash = document.createElement("div");
  elemWithTrash.classList.add("todo__task", `${lastClass}`);
  elemWithTrash.innerHTML = `<div class="todo__check done-check"></div>
  <div class="todo__text">
    ${findedElem.firstElementChild.nextElementSibling.textContent}
  </div>
  <div class="todo__trash">
    <img class='trash__img' src="img/trashcan_02.png" alt="">
  </div>`;
  //===============================INSERT ELEMENT INTO PROPER CONTAINERS==========================================================
  todoBoxAllId.insertAdjacentElement("beforeend", findedElem);
  todoBoxCompletedId.insertAdjacentElement("afterbegin", elemWithTrash);
});

//araray from taskBoxCompleted top level elemnts

changeActiveContainer();
deleteTask();

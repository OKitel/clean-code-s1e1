const taskInput=document.getElementById("new-task");//Add a new task.
const addButton=document.getElementById("add-button");
const incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incompleteTasks
const completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks

const createNewTaskElement=function(taskString){
  const listItem=document.createElement("li");

  const checkBox=document.createElement("input");
  
  const label=document.createElement("label");
  
  const editInput=document.createElement("input");//text
  
  const editButton=document.createElement("button");


  const deleteButton=document.createElement("button");
  const deleteButtonImg=document.createElement("img");

  label.innerText=taskString;
  label.className="task";

  
  checkBox.type="checkbox";
  editInput.type="text";
  editInput.className="task input-text";

  editButton.innerText="Edit";
  editButton.className="edit-button";

  deleteButton.className="delete-button";
  deleteButtonImg.src="./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}



const addTask=function(){
  console.log("Add Task...");
  
  if (!taskInput.value) return;
  const listItem=createNewTaskElement(taskInput.value);

  
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";

}



const editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  const listItem=this.parentNode;

  const editInput=listItem.querySelector('.input-text');
  const label=listItem.querySelector("label");
  const editBtn=listItem.querySelector(".edit-button");
  const containsClass=listItem.classList.contains("edit-mode");

  //If class of the parent is .editmode
  if(containsClass){

    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  }else{
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }

  listItem.classList.toggle("edit-mode");
};


const deleteTask=function(){
  console.log("Delete Task...");

  const listItem=this.parentNode;
  const ul=listItem.parentNode;
  
  ul.removeChild(listItem);

}


const taskCompleted=function(){
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  const listItem=this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete=function(){
  console.log("Incomplete Task...");
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



const ajaxRequest=function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


const bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
//select ListItems children
  const checkBox=taskListItem.querySelector("input[type=checkbox]");
  const editButton=taskListItem.querySelector(".edit-button");
  const deleteButton=taskListItem.querySelector(".delete-button");


  editButton.onclick=editTask;
  deleteButton.onclick=deleteTask;
  checkBox.onchange=checkBoxEventHandler;
}


for (let i=0; i<incompleteTaskHolder.children.length;i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}


for (let i=0; i<completedTasksHolder.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

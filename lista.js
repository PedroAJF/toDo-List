//Seleção de elementos
 const todoForm = document.querySelector("#todo-form")
 const todoInput = document.querySelector("#todo-input")
 const todoLis = document.querySelector("#todo-list")
 const editForm = document.querySelector("#edit-form")
 const editInput = document.querySelector("#edit-input")
 const cancelEdit = document.querySelector("#cancel-edit-btn")

 let oldInputValue;
 
//Funções
const saveTodo =(text) =>{

  const todo =document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML= '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML= '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-todo");
  removeBtn.innerHTML= '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(removeBtn);

  todoLis.appendChild(todo);

  todoInput.value="";
  todoInput.focus();
};
const toggleForm= ()=>{
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoLis.classList.toggle("hide");
};

// poderia ser "editInputValue" ao inves de "text"
const updateTodo = (text) => {
  const todos = document.querySelector(".todo")

  todos.forEach((todo) =>{
    let todoTitle = todo.querySelector("h3")

    if(todoTitle.innerText === oldInputValue){
        todoTitle.innerText = text
    }
  });
}

//Eventos
todoForm.addEventListener("submit", (w)=>{
  w.preventDefault();

  const inputValue= todoInput.value;

  if(inputValue){
    saveTodo(inputValue);
    //salvar todo
  }
});

document.addEventListener("click",(e)=>{
 const targetEl = e.target;
 const parentEL = targetEl.closest("div");
 let todoTitle;


 if(parentEL && parentEL.querySelector("h3")){
   todoTitle = parentEL.querySelector("h3").innerText;
 }

 if(targetEl.classList.contains("finish-todo")){
  parentEL.classList.toggle("done");
 }
 //
 if(targetEl.classList.contains("remove-todo")){
  parentEL.remove();
 }

 if(targetEl.classList.contains("edit-todo")){
  toggleForm();

  editInput.value = todoTitle;
  oldInputValue = todoTitle;
 }

});

cancelEdit.addEventListener("click", (e)=>{
  e.preventDefault();

  toggleForm();
});

editForm.addEventListener("submit", (e)=>{
  e.preventDefault()

  const editInputValue = editInput.value
  if(editInputValue){
   //atualizar
   updateTodo(editInputValue)

  }

  toggleForm()
})
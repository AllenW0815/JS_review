function selectDom(tag){
    return document.querySelector(tag)
}
//declare
const todoInput = selectDom('#todoInput')
const todoAdd = selectDom('#todoAdd')
const todoList = selectDom('#todoList')
//存輸入的內容
const todos = []
//render
function showTodoList(){
    let display = ''
    for(let i =0;i<todos.length;i++){
        display += `<li>${todos[i]}</li>`
    }
    todoList.innerHTML = display
}
//HOF
function showTodoListWay2(){
    let display = todos.map((item) => 
    `
    <li>${item.content}
    <button>Done</button>
    </li>
    `
    )
    todoList.innerHTML = display.join('') //除逗點
}
//addTodo 從下面有共同使用的情況整理上來
function addTodo(){
    //去除掉很多空白的情況
    if(todoInput.value.trim()){
        const item = {id: +new Date(),content:todoInput.value,done:false}
        todos.unshift(item)
        }
        console.log(todos);
        showTodoListWay2()
        todoInput.value = ''  //清空
}

todoAdd.addEventListener('click',()=>{
    addTodo()
})

todoInput.addEventListener('keypress',(event)=>{
    if(event.key === 'Enter'){ //較新的語法
    addTodo()
    }   
})
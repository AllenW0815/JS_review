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
    let display = todos.map((item) => `<li>${item}</li>`)
    todoList.innerHTML = display.join('') //除逗點
}

todoAdd.addEventListener('click',()=>{
    //去除掉很多空白的情況
    if(todoInput.value.trim()){
    todos.unshift(todoInput.value)
    }
    console.log(todos);
    showTodoListWay2()
    todoInput.value = ''
})

todoInput.addEventListener('keypress',(event)=>{
    if(event.key === 'Enter'){ //較新的語法
        if(todoInput.value.trim()){
            todos.unshift(todoInput.value)
        }
        console.log(todos);
        showTodoListWay2()
        todoInput.value = '' //清空
    }   
})
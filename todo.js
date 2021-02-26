function selectDom(tag){
    return document.querySelector(tag)
}
//declare
const todoInput = selectDom('#todoInput')
const todoAdd = selectDom('#todoAdd')
const todoList = selectDom('#todoList')
//存輸入的內容
const todos = [
    {id:1,content:'學CSS',done:true},
    {id:2,content:'學React',done:false}
]
//renders 一般for迴圈
function showTodoList(){
    let display = ''
    for(let i =0;i<todos.length;i++){
        display += `<li>${todos[i]}</li>`
    }
    todoList.innerHTML = display
}
//renders HOF
function showTodoListWay2(){
    let display = todos.map((item) =>
    item.done
    ?`<li><del>${item.content}</del><button class="done" data-id="${item.id}">Done</button></li>`
    :`<li>${item.content}<button class="done" data-id="${item.id}">Done</button></li>`
    )
    todoList.innerHTML = display.join('') //除逗點

    const doneBtns = document.getElementsByClassName("done")
    // console.log(doneBtns);
    for(let i =0 ; i<doneBtns.length;i++){
        doneBtns[i].addEventListener('click',function(e){
            toggleDeleteLine(this.dataset.id)
            showTodoListWay2()
        })
        
    }
    
}
//addTodo 從下面有共同使用的情況整理上來
function addTodo(){
    //去除掉很多空白的情況
    if(todoInput.value.trim()){
        const item = {id: +new Date(),content:todoInput.value,done:false}
        todos.unshift(item)
        }
        // console.log(todos);
        showTodoListWay2()
        todoInput.value = ''  //清空
}
//toggleDeleteLine
function toggleDeleteLine(id){
    for(let i =0 ; i<todos.length;i++){
        //原本傳進來的id是字串 所以用 === 會是false 用==才可以
        //若要用 === 的話 就必須要先轉型 用+
        if(todos[i].id == id){
            todos[i].done = !todos[i].done
        }
    }
}


todoAdd.addEventListener('click',()=>{
    addTodo()
})

todoInput.addEventListener('keypress',(event)=>{
    if(event.key === 'Enter'){ //較新的語法
    addTodo()
    }   
})

//初始化呼叫
showTodoListWay2()
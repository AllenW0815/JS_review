function selectDom(tag){
    return document.querySelector(tag)
}
//declare
const todoInput = selectDom('#todoInput')
const todoAdd = selectDom('#todoAdd')
const todoList = selectDom('#todoList')
const searchInput = selectDom('#searchInput')
const todoSearch = selectDom('#todoSearch')
//存輸入的內容
let todos = []
let searchInputText = ''

// let todos = [
//     {id:1,content:'學CSS',done:true,edited:false},
//     {id:2,content:'學React',done:false,edited:true}
// ]
//renders 一般for迴圈
function showTodoList(){
    let display = ''
    for(let i =0;i<todos.length;i++){
        display += `<li>${todos[i]}</li>`
    }
    todoList.innerHTML = display
}
//--------------------------------------------------------------------
///功能
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
//deleteItem
function deleteItem(id){
    //篩出除了傳入id以外的物件另成新陣列
    const newTodos = todos.filter((i)=> i.id !== +id)
    //複製一份指派給原始陣列
    todos = [...newTodos]
}
//editItem
function editItem (id){
    for(let i =0 ; i<todos.length;i++){
        //將全部先關閉編輯 實現一次只能編輯一個
        todos[i].edited = false
        if(todos[i].id == id){
            todos[i].edited = !todos[i].edited
        }
    }
}
//saveItem
function saveItem (id){
    let newContent =  document.querySelector('.new-content')
    for(let i =0 ; i<todos.length;i++){
        if(todos[i].id == id){
            todos[i].edited = !todos[i].edited
            todos[i].content = newContent.value
        }
    }
}
//searchItem
//本來想用filter比對搜尋關鍵字後產出新陣列 在去重新render畫面 但好像要多寫很多code
function searchItem(){
    const compareItem = searchInput.value
    const localStorageTodos = localStorage.getItem('todos')
    // console.log(compareItem);
    // console.log(typeof compareItem);
    // console.log(JSON.parse(localStorageTodos));
    
    const result = JSON.parse(localStorageTodos).filter(item=>{
        //做篩選比對動作
    })
    console.log(result);
}
//--------------------------------------------------------------------
//renders
function showTodoListWay2(){
    let display = todos.map((item) =>{
        //用如果內文不包含搜尋關鍵字的話就return掉來實現搜尋功能
        if(!item.content.includes(searchInputText)) return
        let displayString = ''

        displayString = item.edited
        ?`<li><input type="text" class="new-content" value="${item.content}" />
        <button class="save" data-id="${item.id}">Save</button>
        <button class="done" data-id="${item.id}">Done</button>
        <button class="del"  data-id="${item.id}">Delete</button>
        </li>`
        :item.done
        ?`<li><del>${item.content}</del>
        <button class="edit" data-id="${item.id}">Edit</button>
        <button class="done" data-id="${item.id}">Done</button>
        <button class="del"  data-id="${item.id}">Delete</button>
        </li>`
        :`<li>${item.content}
        <button class="edit" data-id="${item.id}">Edit</button>
        <button class="done" data-id="${item.id}">Done</button>
        <button class="del"  data-id="${item.id}">Delete</button>
        </li>`

        return displayString
        }
        
    )
    todoList.innerHTML = display.join('') //除逗點

    //加掛刪除線功能
    const doneBtns = document.getElementsByClassName("done")
    // console.log(doneBtns);
    for(let i =0 ; i<doneBtns.length;i++){
        doneBtns[i].addEventListener('click',function(e){
            toggleDeleteLine(this.dataset.id)
            showTodoListWay2()
        })        
    }
    //加掛移除功能
    const delBtns = document.getElementsByClassName("del")
    // console.log(delBtns)
    for(let i =0 ; i<delBtns.length;i++){
        delBtns[i].addEventListener('click',function(e){
            deleteItem(this.dataset.id)
            showTodoListWay2()
        })
    }
    //加掛編輯功能
    const editBtns = document.getElementsByClassName("edit")
    for(let i =0 ; i<editBtns.length;i++){
        editBtns[i].addEventListener('click',function(e){
            editItem(this.dataset.id)
            showTodoListWay2()
        })
    }
    //加掛儲存功能
    const saveBtns = document.getElementsByClassName("save")
    for(let i =0 ; i<saveBtns.length;i++){
        saveBtns[i].addEventListener('click',function(e){
            saveItem(this.dataset.id)
            showTodoListWay2()
        })
    }
    //存到localStorage裡
    localStorage.setItem("todos",JSON.stringify(todos))    
}
//--------------------------------------------------------------------
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
        // console.log(todos);
        // console.log(JSON.stringify(todos));
        // localStorage.clear()
        // localStorage.setItem("todos",JSON.stringify(todos))
        
}

//input加入的部分
todoAdd.addEventListener('click',()=>{
    addTodo()
})
todoInput.addEventListener('keypress',(event)=>{
    if(event.key === 'Enter'){ //較新的語法
    addTodo()
    }   
})
//input搜尋的部分
todoSearch.addEventListener('click',()=>{
    searchInputText = searchInput.value
    showTodoListWay2()
})
function searchFunc(){
    searchInputText = searchInput.value
    showTodoListWay2()
}


//實作刷新頁面但資料不變
const initTodoList = () => {
    const localStorageTodos = localStorage.getItem('todos')
    if(localStorageTodos){
        // console.log(localStorageTodos);
        todos = JSON.parse(localStorageTodos)
        // console.log(todos)
        // JSON.parse(todos)
        showTodoListWay2()
    }else{
        showTodoListWay2()
    }

}


//初始化呼叫
initTodoList()
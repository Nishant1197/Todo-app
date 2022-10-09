import './App.css';
import {useEffect, useState} from 'react'

function App() {
  const [taskList,setTaskList]=useState([{
    taskName:"buy"
    , completed:false
  },{
    taskName:"play"
    , completed:false
  }])


  
  const [task,setTask]=useState()

useEffect(()=>{
if(localStorage.getItem('taskList'))

setTaskList(JSON.parse(localStorage.getItem('taskList')))
},[])

  const addTask=()=>{
    setTaskList([...taskList,{
      taskName:task,
      completed:false
    }])
    localStorage.setItem('taskList',JSON.stringify([...taskList,{
      taskName:task,
      completed:false
    }]))

    setTask('')
  }

  const deleteTask=(item)=>{
    console.log(item);
    console.log(taskList);
const updatedTaskList=taskList.filter((task)=> task!==item )
setTaskList([...updatedTaskList])
localStorage.setItem('taskList',JSON.stringify([...updatedTaskList]))
console.log(updatedTaskList);
  }

  const HandleCheckBox=(e,item)=>{
    let check;
    if(e.target.checked)
      check=true
    else
    check=false

console.log(taskList);
    const updatedTaskList=taskList.filter((task)=> task!==item )
    setTaskList([{taskName:item.taskName,completed:check},...updatedTaskList])
    localStorage.setItem('taskList',JSON.stringify([{taskName:item.taskName,completed:check},...updatedTaskList]))
  }

  return (


    <div className="App">
<h2>Todo App</h2>
<input value={task} onChange={(e)=>setTask(e.target.value)} />
<button onClick={addTask}>Add task</button>

  <div className="all-task">
    <h2>All Task</h2>
    {taskList.map((task)=>{
return(
<div key={task.taskName} className='task-container'>
<span>{task.taskName}</span>
<input type="checkbox" checked={task.completed}  onChange={(e)=>HandleCheckBox(e,task)} />
<button onClick={()=>deleteTask(task)}>Remove</button>
</div>
)

    })

    }


  </div>
  <div className="completed-list">
    <h2>Completed Task</h2>
{taskList.map((task)=>{
return task.completed &&

(<div key={task.taskName} className='task-container'>
<span>{task.taskName}</span>
</div>
)




})}


  </div>


  <div className="pending-list">
<h2>Pending Task</h2>

{taskList.map((task)=>{

return task.completed===false &&
(<div key={task.taskName} className='task-container'>
<span>{task.taskName}</span>
</div>
)



}
)
}
</div>

    </div>
  );
}

export default App;

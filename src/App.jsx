import { useState , useEffect} from 'react'
import { PlusCircle ,ArrowFatLinesUp,Trash,Sun, Moon} from "@phosphor-icons/react";
import './App.css'

function App() {
  const [elements , setElements] = useState('');
  const [newTask , setNewTask] = useState([]);
  const [isDisAble , setIsDisAble] = useState([]);
  const [isChecked , setIsChecked] = useState([]);
  const [theme , setTheme] = useState('light');

  useEffect(()=>{
    if(theme === 'dark'){
      document.documentElement.classList.add('dark');
    }else{
      document.documentElement.classList.remove('dark');
    }
  },[theme]);
  

  const handleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    console.log('Switching theme to', newTheme);
    setTheme(newTheme);
  };

  const handlechange = (event)=>{
    setElements(event.target.value);
  }

  const handleAdd= () =>{
    if(elements==='')return;
    setNewTask([...newTask, elements]);
    setIsChecked([...isChecked,false]);
    setIsDisAble([...isDisAble, true]);
    setElements('');  
  }


  const handleCheckBox = (index)=>{
    const updateChecked = [...isChecked];
    updateChecked[index] = !updateChecked[index];
    setIsChecked(updateChecked);
  }

  const handleTaskUpdate = (key, event) =>{
    const newTasks = newTask.map((task,index)=>{
      if(index===key){
        return event.target.value;
      }else{
        return task;
      }
    });
    setNewTask(newTasks);
  }

  const handleUpdate=(index,event)=>{
    const updatedIsDisAble = [...isDisAble];
    if(updatedIsDisAble[index]){
      handleTaskUpdate(index, event);
    }
    updatedIsDisAble[index] = !updatedIsDisAble[index];
    setIsDisAble(updatedIsDisAble);
  }

  const handleDelete=(key)=>{
    const updateTaskList = newTask.filter((_,index)=>index!==key);
    const updatedChecked = isChecked.filter((_, index) => index !== key);
    const updatedDisabled = isDisAble.filter((_, index) => index !== key);
    setNewTask(updateTaskList);
    setIsChecked(updatedChecked);
    setIsDisAble(updatedDisabled);
  }
  return (
    <div className='bg-slate-200 dark:dark:bg-slate-700'>
      <button onClick={handleTheme}>
        {theme === 'dark' ? <Sun size={32} className='text-white' /> : <Moon size={32} /> }
      </button>
      <div className='main-container bg-slate-100 min-h-full w-full dark:bg-slate-600 md:w-1/2'> 
        <h1 className='heading font-serif text-2xl antialiased hover:subpixel-antialiased font-semibold text-zinc-600 mx-4 items-center dark:text-slate-100'>TO DO LIST</h1>
        <div className='input-task mb-1.5'>
          <input type="text" className='focus:outline-none block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ' value={elements} onChange={handlechange}  />
          <PlusCircle className='cursor-pointer inline-block right-1 dark:text-white' size={28} onClick={handleAdd} />
        </div>
        <div>
          {newTask.map((task,index)=> {
            const lineThrough = isChecked[index] ? 'toDoItem completed' : 'toDoItem';
            const highLight = !isDisAble[index] ? 'focus:input border-2 border-indigo-300/100 rounded-md dark:bg-slate-700' : 'focus:black';
            return (
              <div key = {index} className='task-container border-2 p-2 rounded-lg overflow-auto max-h-screen mb-2 flex justify-around'>
                <input type="checkbox"  className="focus:outline-none w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded-full focus:ring-indigo-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={isChecked[index]} onChange={()=>handleCheckBox(index)}></input>
                <input  className={`focus:outline-none ${lineThrough} ${highLight} italic font-medium verflow-visible lg:w-48 dark:text-slate-100 dark:bg-slate-600 w-22`} disabled={!isChecked[index] || !isDisAble[index]} value={task}  />
                <ArrowFatLinesUp className='cursor-pointer dark:text-white' size={28} onClick={(event)=>handleUpdate(index,event)} />
                <Trash size={28} className='cursor-pointer dark:text-white' onClick={(e)=>handleDelete(index,e)}/>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App

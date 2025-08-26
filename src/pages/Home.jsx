import { useState } from "react";
import ProgressTracker from "./ProgressTracker";
import { FaClipboardList, FaSpinner, FaCheckCircle, FaPlus } from "react-icons/fa";

function Home() {

const [task, setTask] = useState('');
const  [tasks, setTasks] = useState({ todo:[], ongoing: [], completed :[]});

const handleInputChange = (e) => {
    setTask(e.target.value)
};

const addTask = () => {
    if(task.trim() !== '') {
        setTasks((prevTasks) => ({
            ...prevTasks, todo:[...prevTasks.todo, task],
        }));
        setTask('');
    }
};

const moveTask =(currentCategory, targetCategory, taskTomove) => {
    setTasks((prevTasks) => {
        const updatedCurrent = prevTasks[currentCategory].filter(
            (t) => t !== taskTomove
        );

        const updatedTarget = [...prevTasks[targetCategory],taskTomove];
        return {...prevTasks, [currentCategory] :updatedCurrent,[targetCategory]: updatedTarget};
    });
};

const removeTask =(category, taskToremove) => {
    setTasks((prevTasks) => {
        const updatedCategory = prevTasks[category].filter(
            (t) => t !== taskToremove
        );
        return {...prevTasks,[category]:updatedCategory}
    });
};

    return (
        <>
        <div className="home">
            
            <form className="task-from"
            onSubmit={(e) => {
                e.preventDefault();
                addTask();
            }} >
                <input type="text"
                placeholder="Enter Task..."
                className="task-input"
                value={task}
                onChange={handleInputChange}
                />
           
            <button type="button"
            className="submit-button"
            onClick={addTask}
            > <FaPlus className="add-icon" /> ADD Task</button>
             </form>

            <div className="tasks-sections">

                <div className="task-section">
                    <h2><FaClipboardList className="todo-icon"/> TO-DO Task</h2>
                    <ul>
                        {tasks.todo.map((t, index) => (
                            <li key={index} className="item" >
                                <span>{t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()}</span>
                             <button  className="ong-btn" onClick={() => moveTask('todo', 'ongoing',t)}>
                               Move to Ongoing
                             </button>
                             <button className="comp-btn" onClick={() => moveTask('todo', 'completed',t)}>
                                Move to Completed
                             </button>
                             <button className="del-btn" onClick={() => removeTask('todo', t)}>
                              Delete
                                 </button>
                            </li>
                        ))}
                    </ul>
                  </div>

                 <div className="task-section">
                    <h2> <FaSpinner className="ong-icon" /> Ongoing Task</h2>
                    <ul>
                        {tasks.ongoing.map((t, index) => (
                            <li key={index} className="item">
                                {t}
                             <button className="todo-btn" onClick={() => moveTask('ongoing', 'todo',t)}>
                               Move to Todo
                             </button>
                             <button className="comp-btn" onClick={() => moveTask('ongoing', 'completed',t)}>
                                Move to Completed
                             </button>
                             <button className="del-btn" onClick={() => removeTask('ongoing', t)}>
                                Delete
                                                             </button>
                            </li>
                        ))}
                    </ul>
                 </div>

                  <div className="task-section">
                    <h2> <FaCheckCircle className="comp-icon"/>Completed Task</h2>
                    <ul>
                        {tasks.completed.map((t, index) => (
                            <li key={index} className="item">
                                {t}
                             <button className="todo-btn" onClick={() => moveTask('completed', 'todo',t)}>
                               Move to Todo
                             </button>
                             <button className="ong-btn" onClick={() => moveTask('completed', 'ongoing',t)}>
                                Move to Ongoing
                             </button>
                             <button className="del-btn" onClick={() => removeTask('completed', t)}>
                                Delete
                         </button>
                            </li>
                        ))}
                    </ul>
                </div>
             </div>
             <ProgressTracker tasks={tasks} />
        </div>
        </>
    );
}

export default Home
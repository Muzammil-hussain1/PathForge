import React from "react";
import Home from "./Home";

function ProgressTracker({tasks}) {
 const completedTasks = tasks.completed.length;

const totalTasks =
    tasks.todo.length + tasks.ongoing.length + tasks.completed.length; 
 const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

 return(
    <div className="progress-tracker">
        <p>
            {completedTasks} of {totalTasks} tasks completed
        </p>
        <div className="progress-bar">
            <div className="progress" 
            style={{width: `${progress}%`}}
            ></div>
        </div>
    </div>
 );
}

export default ProgressTracker
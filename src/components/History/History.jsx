import './History.css'
import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../services/localStorage.service';


const History = (props) => {
const { tasks } = useContext(UserContext);
const [edited, setEdited] = useState(tasks)

useEffect(() => {
const filteredItems = tasks.filter((task) => task.isEdited)
setEdited(filteredItems.length > 0 ? filteredItems : null)
}, [])


  return (<>
			<h1 className="top-title">{props.title}</h1>
    <div className="display-todo-container"> 
    {edited ? edited.map((todo, index) => (
        <div className="task-wrapper">
            <h3
                key={index}
                draggable
                style={{
                    textDecoration: todo.complete ? 'line-through' : 'none',
                    background: todo.complete ? 'red' : null,
                }}
                className="todo-item-text"
            >
                {props.mode === 'current' ? todo.todo : `To do Now: ${todo.todo}. Before:` }
                {props.mode === 'history' && todo.history.map((item) => {
                    return <p>{item}</p>
                }) }
            </h3>
        </div>
    )): <h5>Nothing To Show</h5>} 
</div>
</>
  )
}

export default History
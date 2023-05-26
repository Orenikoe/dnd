import './TasksDisplay.css';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from "../../services/localStorage.service";


const TasksDisplay = (props) => {
	const {  userDetails, tasks, setTasks } = useContext(UserContext);
	const [filteredTodo, setFilteredTodo ] = useState(tasks);
	const [todoInputText, setTodoInputText] = useState('');
	const [editMode, setEditMode] = useState({ state: false, taskIndex: null });
	let todoItemDrag = useRef();
	let todoItemDragOver = useRef();
	const inputRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (userDetails.token === null) {
			navigate('/login') 
		}
	}, []);

	useEffect(() => {
		setFilteredTodo(tasks.filter((item) => item.owner === userDetails.token))
	}, [tasks]);

	function handleAddTodo() {
		if (todoInputText.length > 0 && !editMode.state) {
			setTasks([
				...tasks,
				{owner: userDetails.token, todo: todoInputText, complete: false, isDragging: false, isEdited: false, history: [] },
			]);
		}
		if (editMode.state && todoInputText.length > 0) {
			const editedTasks = tasks.map((todo, index) => {
				if (index === editMode.taskIndex) {
					todo.history.push(todo.todo)
					todo.todo = todoInputText;
					todo.isEdited = true;
				}
				return todo;
			});
			setTasks(editedTasks);
			inputRef.current.value = "";
		}
		setEditMode({ state: false, taskIndex: null });
	}

	const editTask = (taskData, index) => {
		setEditMode({ state: true, taskIndex: index });
		inputRef.current.value = taskData.todo;
	};

	

	function handleTodoClicks(e, index) {
		console.log(filteredTodo)
		switch (e.detail) {
			case 1:
				const newArr = [];
				tasks.forEach((item, i) => {
					if (i === index) {
						newArr.push({
							...item,
							complete: !item.complete,
						});
					} else {
						newArr.push(item);
					}
				});

				setTasks(newArr);

				break;
			case 2:
				setTasks(tasks.filter((item, iy) => iy !== index));
				break;

			default:
				break;
		}
	}

	function D_Start(e, index) {
		todoItemDrag.current = index;
	}

	function D_Enter(e, index) {
		todoItemDragOver.current = index;

		const cpArr = [...tasks];

		let finalArr = [];

		cpArr.forEach((item) => {
			finalArr.push({
				...item,
				isDragging: true,
			});
		});

		finalArr[index].isDragging = true;

		setTasks(finalArr);
	}
	function D_End() {
		const arr1 = [...tasks];

		const todo_item_main = arr1[todoItemDrag.current];
		arr1.splice(todoItemDrag.current, 1);
		arr1.splice(todoItemDragOver.current, 0, todo_item_main);

		todoItemDrag.current = null;
		todoItemDragOver.current = null;

		let f_arr = [];

		arr1.forEach((item) => {
			f_arr.push({
				...item,
				isDragging: false,
			});
		});

		setTasks(f_arr);
	}

	return (
		<div>
			<h1>{props.title}</h1>
			<div className="todo-container">
				<input
					ref={inputRef}
					onChange={(e) => setTodoInputText(e.target.value)}
					className="input-todo-text"
					type="text"
					placeholder="enter a task"
				/>
				<button onClick={() => handleAddTodo()} className="add-todo-button">
					{editMode.state ? 'Save Changes' : 'Add Task'}
				</button>
				<div className="display-todo-container">
					{filteredTodo.map((todo, index) => (
						<div className="task-wrapper">
							<h3
								key={index}
								draggable
								onDragStart={(e) => D_Start(e, index)}
								onDragEnter={(e) => D_Enter(e, index)}
								onDragEnd={(e) => D_End(e, index)}
								style={{
									textDecoration: todo.complete ? 'line-through' : 'none',
									background: todo.complete ? 'red' : null,
								}}
								onClick={(e) => handleTodoClicks(e, index)}
								className="todo-item-text"
							>
								{todo.todo}
							</h3>
							{todo.isDragging ? <div className="drag-indicator"></div> : null}
							{props.mode === 'current' ? <img
								className="edit-img"
								onClick={() => editTask(todo, index)}
								src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-icon-15.png"
								alt="edit"
							></img> : null}
								<div>
							{props.mode === 'history' && todo.history.map((version) => {
								return <p>{version}</p>
							})}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TasksDisplay;

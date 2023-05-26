import './TasksDisplay.css';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from "../../services/localStorage.service";


const TasksDisplay = (props) => {
	const {  userDetails } = useContext(UserContext);
	const [todos, setTodos] = useState(
		JSON.parse(localStorage.getItem('tasks'))
			? JSON.parse(localStorage.getItem('tasks'))
			: []
	);
	const [todoInputText, setTodoInputText] = useState('');
	const [editMode, setEditMode] = useState({ state: false, taskIndex: null });
	let todoItemDrag = useRef();
	let todoItemDragOver = useRef();
	const inputRef = useRef(null);
	const navigate = useNavigate('/login');

	useEffect(() => {
		if (userDetails.token === null) {
			navigate('/login') 
		}
	}, []);

	function handleAddTodo() {
		if (todoInputText.length > 0 && !editMode.state) {
			setTodos([
				...todos,
				{ todo: todoInputText, complete: false, isDragging: false },
			]);
		}
		if (editMode.state && todoInputText.length > 0) {
			const editedTasks = todos.map((todo, index) => {
				if (index === editMode.taskIndex) {
					todo.todo = todoInputText;
				}
				return todo;
			});
			setTodos(editedTasks);
			inputRef.current.value = "";
		}
		setEditMode({ state: false, taskIndex: null });
	}

	const editTask = (taskData, index) => {
		setEditMode({ state: true, taskIndex: index });
		inputRef.current.value = taskData.todo;
	};

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(todos));
	}, [todos]);

	

	function handleTodoClicks(e, index) {
		switch (e.detail) {
			case 1:
				// complete - > true
				const newArr = [];
				todos.forEach((item, i) => {
					if (i === index) {
						newArr.push({
							todo: item.todo,
							complete: !item.complete,
						});
					} else {
						newArr.push(item);
					}
				});

				setTodos(newArr);
				break;
			case 2:
				setTodos(todos.filter((item, iy) => iy !== index));
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

		const cpArr = [...todos];

		let finalArr = [];

		cpArr.forEach((item) => {
			finalArr.push({
				todo: item.todo,
				complete: item.complete,
				isDragging: true,
			});
		});

		finalArr[index].isDragging = true;

		setTodos(finalArr);
	}
	function D_End() {
		const arr1 = [...todos];

		const todo_item_main = arr1[todoItemDrag.current];
		arr1.splice(todoItemDrag.current, 1);
		arr1.splice(todoItemDragOver.current, 0, todo_item_main);

		todoItemDrag.current = null;
		todoItemDragOver.current = null;

		let f_arr = [];

		arr1.forEach((item) => {
			f_arr.push({
				todo: item.todo,
				complete: item.complete,
				isDragging: false,
			});
		});

		setTodos(f_arr);
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
					{todos.map((todo, index) => (
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
							<img
								className="edit-img"
								onClick={() => editTask(todo, index)}
								src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-icon-15.png"
								alt="edit"
							></img>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TasksDisplay;

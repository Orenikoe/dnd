import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TasksDisplay from '../TasksDisplay/TasksDisplay';
import Login from '../Login/Login';

const Main = () => {
	// eslint-disable-next-line
	const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("tasks")) ? JSON.parse(localStorage.getItem("tasks")) : [] );


	


	return (
		<main>
			<Routes>
				<Route
					path="/tasks"
					element={<TasksDisplay data={todos} mode='current' title='To Do' />}
				/>
				<Route
					path="/history"
					element={<TasksDisplay data={todos} mode='history' title='Edit History'  />}
				/>
				<Route
					path="/"
					element={< Login />}
				/>
			</Routes>
		</main>
	
	); 
};

export default Main;

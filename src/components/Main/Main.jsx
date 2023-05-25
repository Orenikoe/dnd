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
				<Route path="/login" element={< Login />} />
				<Route
					path="/done"
					element={<TasksDisplay data={todos} title='Done'  />}
				/>
				<Route
					path="/tasks"
					element={<TasksDisplay data={todos} title='To Do' />}
				/>
				<Route
					path="/history"
					element={<TasksDisplay data={todos} title='Edit History'  />}
				/>
				<Route
					path="/"
					element={<TasksDisplay title='To Do' />}
				/>
			</Routes>
		</main>
	
	); 
};

export default Main;

import React, { useState, useContext } from 'react';
import { authApi } from '../../services/auth.service.';
import { useNavigate } from 'react-router-dom';
import UserContext from "../../services/localStorage.service";


const Login = () => {
  const {  setUserDetails } = useContext(UserContext);
	const [approved, setApproved] = useState(false);
	const [phone, setPhone] = useState(null);
	const [signUpMode, setSignUpMode] = useState(false);
	const [otp, setOtp] = useState(null);
	const [error, setError] = useState(false);
  const navigate = useNavigate()

	function handleLogin(phone) {
		console.log(phone);
		authApi
			.postUser('0788418915')
			.then((res) => {
				setApproved(() => true);
			})
			.catch((err) => {
				console.log(err);
				setError(() => true);
			});
	}

	function handleSignUp(phone) {
		authApi
			.registerUser(phone)
			.then((res) => {
				setApproved(() => true);
			})
			.catch((err) => {
				console.log(err);
				setError(() => true);
			});
	}

	function verifyLogin(phone, otp) {
		console.log(phone);
		authApi
			.login(phone, otp)
			.then((res) => {
				console.log(res);
				localStorage.setItem('token', phone);
        navigate('/tasks');
        setUserDetails({token: phone})
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<>
			<h2>{signUpMode ? "Join Us Now!" : "Welcome Back!"}</h2>
			<input
				placeholder="Telephone"
				onChange={(e) => {
					setPhone(e.target.value);
					setError(() => false);
				}}
			></input>
			{!approved && (
				<button onClick={() => signUpMode ? handleSignUp(phone) : handleLogin(phone)}>{signUpMode ? "Next" : "Send Me Otp"}</button>
			)}
			{approved && (
				<div>
					<input
						placeholder="OTP"
						onChange={(e) => {
							setOtp(e.target.value);
						}}
					></input>
					<div>
						<button onClick={() => verifyLogin(phone, otp)}>{signUpMode ? "Register" : "Login"}</button>
					</div>
				</div>
			)}
			{error && <h6>Number is not registered with us</h6>}
			<p onClick={() => setSignUpMode(true)}>
				Doesn't have an acoount? Join Us!
			</p>
		</>
	);
};

export default Login;

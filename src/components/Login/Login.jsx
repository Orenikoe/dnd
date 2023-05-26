import React, { useState, useContext } from 'react';
import './Login.css'
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
	const [otpError, setOtpError] = useState(false);
  const navigate = useNavigate()

	function handleLogin(phone) {
		authApi
			.loginUser(phone)
			.then((res) => {
        console.log(res)
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
        console.log(res)
				setApproved(() => true);
			})
			.catch((err) => {
				console.log(err);
				setError(() => true);
			});
	}

	function verifyLogin(phone, otp) {
		authApi
			.verifyUser(phone, otp)
			.then((res) => {
				console.log(res);
				localStorage.setItem('token', phone);
        navigate('/tasks');
        setUserDetails({token: phone})
			})
			.catch((err) => {
        setOtpError(true)
				console.log(err);
			});
	}

	return (
		<>
			<h2 className='top-title'>{signUpMode ? "Join Us Now!" : "Welcome Back!"}</h2>
			<input
      className='input-field'
				placeholder="Telephone"
				onChange={(e) => {
					setPhone(e.target.value);
					setError(() => false);
				}}
			></input>
			{!approved && (
				<button className='button' onClick={() => signUpMode ? handleSignUp(phone) : handleLogin(phone)}>{signUpMode ? "Next" : "Send Me Otp"}</button>
			)}
			{approved && (
				<div>
					<input
          className='input-field'
						placeholder="OTP"
						onChange={(e) => {
							setOtp(e.target.value);
              setOtpError(false)
						}}
					></input>
					<div>
						<button className='button' onClick={() => verifyLogin(phone, otp)}>{signUpMode ? "Register" : "Login"}</button>
					</div>
				</div>
			)}
			{error && <h6 className='error-line'>Number is not registered with us</h6>}
			{otpError && <h6 className='error-line'>OTP is incorrect</h6>}
			<p onClick={() => setSignUpMode(true)}>
				Doesn't have an acoount? Join Us!
			</p>
		</>
	);
};

export default Login;

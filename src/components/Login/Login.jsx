import React, {useState} from 'react'
import { ProductAPI } from '../../services/api-data'


const Login = () => {
  const [approved, setApproved] = useState(false);
  const [phone, setPhone] = useState(null);
  const [otp, setOtp] = useState(null);
  const [error, setError] = useState(false);
 
  function handleLogin(phone) {
    console.log(phone)
    ProductAPI.postUser('0788418915').then((res) => {
      setApproved(() => true);
    }).catch((err) => {
      console.log(err)
      setError(() => true)
    })
  }

  function verifyLogin(phone, otp) {
    console.log(phone)
    ProductAPI.login(phone, otp).then((res) => {
      console.log(res)
      localStorage.setItem('token', 'token');
    }).catch((err) => {
      console.log(err)
    })
  }
   

  return (
    <>
      <input placeholder='Telephone' onChange={(e) => {
        setPhone(e.target.value)
        setError(() => false)
      }} ></input>
    {!approved && <button onClick={() => handleLogin(phone)}>Send Me Otp</button>}
    {approved && <div>
      <input placeholder='OTP' onChange={(e) => {
        setOtp(e.target.value)
      }} ></input>
      <div>
    <button onClick={() => verifyLogin(phone, otp)}>Login</button>
      </div>
      </div>}
    {error && <h6>Number is not registered with us</h6>}
    </> 
  )
}

export default Login
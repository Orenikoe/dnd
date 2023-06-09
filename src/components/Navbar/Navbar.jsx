import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { NavbarLinks } from '../../app-consts'
import './Navbar.css'
import UserContext from "../../services/localStorage.service";

const Navbar = () => {
  const {  userDetails, setUserDetails } = useContext(UserContext);

    
  return (
    <div className='nav-wrapper'>
      {!userDetails.token && <img className='company-logo' alt="logo" src="https://i.ibb.co/9TSSNQf/company-icon-2.png"/>}
      {userDetails.token && 
        <nav>
            {NavbarLinks.map((navElement) => {
            return <div className='menu-item'>
              <Link key={navElement.toLocation} onClick={navElement.functionality ? () => {
              localStorage.removeItem('token')
              setUserDetails({token: null})
              } : null} to={navElement.toLocation}><button className='button'>{navElement.title}</button></Link>
              </div>})}
        </nav>}
      </div>
  )
}

export default Navbar
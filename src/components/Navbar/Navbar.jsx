import NavButton from '../Button/Button'
import React from 'react'
import {Link} from 'react-router-dom'
import { NavbarLinks } from '../../app-consts'
import './Navbar.css'

const Navbar = () => {
    
  return (
    <nav>
        {NavbarLinks.map((navElement) => {
            return  <Link key={navElement.toLocation} to={navElement.toLocation}><NavButton data={navElement}/></Link>
        })}
       
    </nav>
  )
}

export default Navbar
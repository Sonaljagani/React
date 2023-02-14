import React from 'react'
import { Button, Stack,} from '@mui/material';
import {  NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    
        <header>
        <h1 id="nav-title">REACT CURD</h1>
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/About">About</NavLink></li>
                <li><NavLink to="/Contect">Contact</NavLink></li>
                
            </ul>
            <Stack spacing={2}>
      <Button  variant="contained"><NavLink to="/users/Adduser">
        Add User
      </NavLink></Button>
            </Stack>
        </nav>
    </header>
     
  )
}
export default Navbar



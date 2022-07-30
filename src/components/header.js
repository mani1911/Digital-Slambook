import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Logout from '../components/logout';
import classes from './header.module.css'
const Header = ()=>{
    const user = useSelector(selectUser);
    return <nav className={classes.nav}>
    <Link to = "/" className = {classes["site-title"]}>Slambook</Link>
    <ul>
        <li><Link to = {`/profile`}>Profile</Link></li>
        <li>
            {!user.loggedIn? <Link to = "/login">Login</Link> : <Logout/>}
            
        </li>
    </ul>
    </nav>
}

export default Header;
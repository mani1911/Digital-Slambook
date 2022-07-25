import React from "react";
import { Link } from "react-router-dom";
import './header.css'
const Header = ()=>{
    return <nav className="nav">
    <Link to = "/" className = "site-title">Slambook</Link>
    <ul>
        <li className = "active">
            <Link to = "/register">Register</Link>
        </li>
        <li>
            <Link to = "/login">Login</Link>
        </li>
    </ul>
    </nav>
}

export default Header;
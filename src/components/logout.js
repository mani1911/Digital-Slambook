import React from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import { useDispatch } from "react-redux/es/exports";
import { logout } from "./features/userSlice";
import classes from './logout.module.css'

const Logout = ()=>{
    const dispatch = useDispatch();
    const logoutHandler = async ()=>{
        dispatch(logout());
        alert('Successfully Loggded Out');
        const res = await axios.post('http://localhost:3002/user/logout');

    }
    return<div className= {classes.cont}>
        <Link to = '/' onClick = {logoutHandler}>Logout</Link>
    </div>
}

export default Logout;
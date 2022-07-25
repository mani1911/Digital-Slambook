import React from "react";
import axios from "axios";
import { useSelector } from "react-redux/es/exports";
import { selectUser } from './features/userSlice';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux/es/exports";
import { logout } from "./features/userSlice";
import classes from './logout.module.css'

const Logout = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let user = useSelector(selectUser); 
    const logoutHandler = async ()=>{
        dispatch(logout());
        const res = await axios.post('http://localhost:3002/user/logout');
        console.log(res.data.message);
        navigate('/');
    }
    return<div className= {classes.cont}>
        <a onClick = {logoutHandler}>Logout</a>
    </div>
}

export default Logout;
import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import {login} from '../features/userSlice';
import {Link} from 'react-router-dom';
import classes from './login.module.css';
const Login = ()=>{
    let navigate = useNavigate();
    let [username, setUserName] = useState('');
    let [password, setPassword] = useState('');
    let URL = 'http://localhost:3002/user/login';

    const dispatch = useDispatch();

    const submitHandler = async e=>{
        e.preventDefault();
        if(username.length === 0 || password.length === 0) return;
        const res = await axios.post(URL, {username, password});
        if(res.data.status === 1){
            navigate(`/profile`);
            dispatch(
                login({
                    ...res.data.user,
                    loggedIn : true,
                })
            );
        }
        else{
            alert(res.data.message)
        }
        
        setUserName('');
        setPassword('');
    }
    return <div className="body">
    <div className={classes.background}>
        <div className={classes.shape}></div>
        <div className={classes.shape}></div>
    </div>
    <form onSubmit={submitHandler}>
        <h3>Login Here</h3>

        <label for="username">Username</label>
        <input value ={username} type="text" placeholder="Username" id="username" onChange = {e=>setUserName(e.target.value)}/>

        <label for="password">Password</label>
        <input value = {password} type="password" placeholder="Password" id="password" onChange = {e=>setPassword(e.target.value)}/>

        <button type = "submit">Log In</button>
        <Link to = "/register"><div className={classes.link}>Not a User? Register Here</div></Link>
    </form>
    </div>
}

export default Login;
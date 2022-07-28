import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import {login} from '../features/userSlice';
import {Link} from 'react-router-dom';
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
        console.log(res)
        if(res.data.user){
            navigate(`/profile/:${res.data.user._id}`);
        }
        dispatch(
            login({
                ...res.data.user,
                loggedIn : true,
            })
        );
        
        setUserName('');
        setPassword('');
    }
    return<>
    <h4>Login</h4>
    <form onSubmit={submitHandler}>
        <div>
            <label>Username</label>
            <input value = {username} type = "text" placeholder="Name" onChange = {e=>setUserName(e.target.value)}></input>
        </div>
        <div>
            <label>Password</label>
            <input value = {password} type = "password" placeholder="Password" onChange = {e=>setPassword(e.target.value)}></input>
        </div>
        <Link to = "/register"><h5>New User? Register Here.</h5></Link>
        <button type="submit">Login</button>
    </form>
</>
};

export default Login;
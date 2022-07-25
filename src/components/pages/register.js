import React, { useState } from "react";
import axios from 'axios';
const Register = ()=>{
    let [username, setUserName] = useState('');
    let [password, setPassword] = useState('');
    let [name, setName] = useState('');

    let URL = 'http://localhost:3002/user/reg';

    const submitHandler = async e=>{
        e.preventDefault();
        if(username.length === 0 || password.length === 0) return;
        const res = await axios.post(URL, {username, password,name});
        console.log(res.data.message);
        setName('');
        setPassword('');
        setUserName('');
    }
    return <>
        <h4>Register</h4>
        <form onSubmit={submitHandler}>
            <div>
                <label>Username</label>
                <input value = {username} type = "text" placeholder="Name" onChange = {e=>setUserName(e.target.value)}></input>
            </div>
            <div>
                <label>Full Name</label>
                <input value = {name} type = "text" placeholder="Name" onChange = {e=>setName(e.target.value)}></input>
            </div>
            <div>
                <label>Password</label>
                <input value = {password} type = "password" placeholder="Password" onChange = {e=>setPassword(e.target.value)}></input>
            </div>
            <button type="submit">Register</button>
        </form>
    </>
};

export default Register;
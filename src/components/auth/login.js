import React, { useState } from "react";
import axios from "axios";
import { v4 } from "uuid";
const Login = ()=>{
    let [name, setName] = useState('');
    let [password, setPassword] = useState('');
    let URL = 'http://localhost:3002/user/login';
    const submitHandler = async e=>{
        e.preventDefault();
        if(name.length === 0 || password.length === 0) return;
        const res = await axios.post(URL, {name, password, id : v4()});
        console.log(res.data.message);
        setName('');
        setPassword('');
    }
    return<>
    <h4>Login</h4>
    <form onSubmit={submitHandler}>
        <div>
            <label>Name</label>
            <input value = {name} type = "text" placeholder="Name" onChange = {e=>setName(e.target.value)}></input>
        </div>
        <div>
            <label>Password</label>
            <input value = {password} type = "password" placeholder="Password" onChange = {e=>setPassword(e.target.value)}></input>
        </div>
        <button type="submit">Login</button>
    </form>
</>
};

export default Login;
import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const Register = ()=>{
    const navigate = useNavigate();
    let [username, setUserName] = useState('');
    let [password, setPassword] = useState('');
    let [name, setName] = useState('');
    let [dept, setDept] = useState('');
    let [desc, setDesc] = useState('');

    let URL = 'http://localhost:3002/user/reg';

    const submitHandler = async e=>{
        e.preventDefault();
        if(username.length === 0 || password.length === 0) return;
        const res = await axios.post(URL, {username, password,name, description : desc, department : dept});
        console.log(res.data.message);
        setName('');
        setPassword('');
        setUserName('');
        setDept('');
        setDesc('');
        navigate('/login');
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
            <div>
                <label>Department</label>
                <input value = {dept} type = "text" placeholder="Department" onChange = {e=>setDept(e.target.value)}></input>
            </div>
            <div>
                <label>Description</label>
                <textarea value = {desc} onChange = {e=> setDesc(e.target.value)}></textarea>
            </div>
            <button type="submit">Register</button>
        </form>
    </>
};

export default Register;
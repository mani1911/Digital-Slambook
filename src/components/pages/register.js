import React, { useState } from "react";
import axios from 'axios';
import regcss from './reg.module.css'
import {useNavigate} from 'react-router-dom';

const Register = ()=>{
    const navigate = useNavigate();
    let [username, setUserName] = useState('');
    let [password, setPassword] = useState('');
    let [name, setName] = useState('');
    let [dept, setDept] = useState('');
    let [desc, setDesc] = useState('');

    let URL = 'http://localhost:3002/user/reg';
    const options = [
        {
          label: "CSE",
          value: "Computer Science Engineering",
        },
        {
          label: "ECE",
          value: "Electrical And Communication Engineering",
        },
        {
          label: "EEE",
          value: "Electrical And Electronic Engineering",
        },
        {
          label: "PROD",
          value: "Production Engineering",
        },
      ];
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
        if(res.data.status === 0){
            alert(res.data.message)
        }
        else{
            navigate('/login');
        }

    }
    return <div className="body">
    <div className={regcss.background}>
    </div>
    <form onSubmit={submitHandler}>
        <h3>Register</h3>

        <label>Username</label>
        <input value ={username} type="text" placeholder="Username" id="username" onChange = {e=>setUserName(e.target.value)}/>

        <label>Username</label>
        <input value ={name} type="text" placeholder="Fullname" id="name" onChange = {e=>setName(e.target.value)}/>

        <label>Password</label>
        <input value = {password} type="password" placeholder="Password" id="password" onChange = {e=>setPassword(e.target.value)}/>

        <label>Department</label>
        <select value = {dept} onChange = {e=>setDept(e.target.value)}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        
        <label>Description</label>
        <textarea placeholder = "Describe Yourself" value = {desc} onChange = {e=> setDesc(e.target.value)}></textarea>

        <button type = "submit">Register</button>
    </form>
    </div>
};

export default Register;
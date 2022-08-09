import React, { useState } from "react";
import axios from 'axios';
import regcss from './reg.module.css'
import {useNavigate, Link} from 'react-router-dom';
import Spinner from "../.././ui/Spinner";
import Modal from "../.././ui/Modal";

const Register = ()=>{
    const navigate = useNavigate();
    let [message, setMessage] = useState('');
    let [openModal, setOpenModal] = useState(false);
    let [username, setUserName] = useState('');
    let [password, setPassword] = useState('');
    let [name, setName] = useState('');
    let [dept, setDept] = useState('');
    let [desc, setDesc] = useState('');
    let [isLoading, setIsLoading] = useState(false);
    let [year, setYear] = useState('');
    let [image, setImage] = useState('');

    let URL = 'https://slambook01.herokuapp.com/user/reg';
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
          label: "MECH",
          value: "Mechanical Engineering",
        },
        {
          label: "PROD",
          value: "Production Engineering",
        },
        {
          label: "ICE",
          value: "Instrumentation and Control Engineering",
        },
        {
          label: "CIVIL",
          value: "Civil Engineering",
        },
      ];
    const submitHandler = async e=>{
        setIsLoading(true);
        e.preventDefault();
        const fd = new FormData();
        fd.append('username', username);
        fd.append('name', name);
        fd.append('password', password);
        fd.append('department', dept);
        fd.append('description', desc);
        fd.append('image', image);
        fd.append('year', year);
        const res = await axios.post(URL, fd);
        console.log(res.data.message);
        if(res.data.status === 0){
            setMessage(res.data.message);
            setOpenModal(true);
            setIsLoading(false)
        }
        else{
            setName('');
            setPassword('');
            setUserName('');
            setDept('');
            setDesc('');
            setIsLoading(false);
            setYear('');
            navigate('/login');
          }
    }
    return <div className="body">
    {openModal? <Modal open = {openModal} message = {message} toggleModal = {()=> setOpenModal(false)} /> : null}
    <div className={regcss.background}>
    </div>
    <form onSubmit={submitHandler} encType = "multipart/form-data">
        <h3>Register</h3>

        <label>Username</label>
        <input value ={username} type="text" placeholder="Username" onChange = {e=>setUserName(e.target.value)}/>

        <label>Name</label>
        <input value ={name} type="text" placeholder="Fullname" onChange = {e=>setName(e.target.value)}/>

        <label>Password</label>
        <input value = {password} type="password" placeholder="Password" id="password" onChange = {e=>setPassword(e.target.value)}/>

        <label>Year</label>
        <input value ={year} type="number" placeholder="Year of Joining" onChange = {e=>setYear(parseInt(e.target.value))}/>

        <label>Department</label>
        <select value = {dept} onChange = {e=>setDept(e.target.value)}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>

        <label>Choose Image</label>
        <input type="file" filename = "image" onChange = {e=>setImage(e.target.files[0])}/>

        <label>Description</label>
        <textarea placeholder = "Describe Yourself" value = {desc} onChange = {e=> setDesc(e.target.value)}></textarea>
        <Link to = "/login"><div className={regcss.link}>Already a User? Login here</div></Link>

        {isLoading?<Spinner/>:<button type = "submit">Register</button>}
    </form>
    </div>
};

export default Register;
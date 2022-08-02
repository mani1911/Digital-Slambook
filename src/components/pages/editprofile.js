import React, { useState } from "react";
import axios from 'axios';
import regcss from './reg.module.css'
import {useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

const EditProfile = ()=>{
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [name, setName] = useState(user.name);
    let [dept, setDept] = useState(user.department);
    let [desc, setDesc] = useState(user.description);
    let [year, setYear] = useState(user.year);

    let URL = 'http://localhost:3002/user/edit';
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
        if(!name || !desc || !year || !dept){
          alert('Input Field cannot be empty');
          return;
        }
        const res = await axios.post(URL, {id : user._id, name, description : desc, department : dept, year});
        dispatch(
            login({
                _id : user._id,
                name,
                username : user.username,
                department : dept,
                description : desc,
                loggedIn : true,
                year
            })
        );
        if(res.data.status === 0){
            alert(res.data.message)
        }
        else{
            navigate('/profile');
        }

    }
    return <div className="body">
    <div className={regcss.background}>
    </div>
    <form onSubmit={submitHandler}>
        <h3>Edit Profile</h3>

        <label>Name</label>
        <input value ={name} type="text" placeholder="Fullname"     onChange = {e=>setName(e.target.value)}/>

        <label>Department</label>
        <select value = {dept} onChange = {e=>setDept(e.target.value)}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>

        <label>Year</label>
        <input value ={year} type="text" placeholder="Year of Joining" onChange = {e=>setYear(parseInt(e.target.value))}/>
        
        <label>Description</label>
        <textarea className={regcss.description} placeholder = "Describe Yourself" value = {desc} onChange = {e=> setDesc(e.target.value)}></textarea>

        <button type = "submit">Save</button>
        <button onClick={()=>{navigate('/profile')}}>Cancel</button>
    </form>
    </div>
};

export default EditProfile;
import React, { useState } from "react";
import axios from 'axios';
import regcss from '../auth/reg.module.css'
import {useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

const EditProfile = ()=>{
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [name, setName] = useState(user.name);
    let [dept, setDept] = useState(user.department);
    let [desc, setDesc] = useState(user.description);
    let [year, setYear] = useState(user.year);
    let [image, setImage] = useState();

    let URL = 'https://slambook01.herokuapp.com/user/edit';
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
        const fd = new FormData();
        fd.append('name', name);
        fd.append('id', user._id);
        fd.append('department', dept);
        fd.append('description', desc);
        fd.append('image', image);
        fd.append('year', year);
        const res = await axios.post(URL, fd);
        dispatch(
            login({
                _id : user._id,
                name,
                username : user.username,
                department : dept,
                description : desc,
                loggedIn : true,
                image,
                year
            })
        );
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
        <h3>Edit Profile</h3>

        <label>Name</label>
        <input value ={name} type="text" placeholder="Fullname"     onChange = {e=>setName(e.target.value)}/>

        <label>Department</label>
        <select value = {dept} onChange = {e=>setDept(e.target.value)}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>

        <label>Choose Image</label>
        <input type="file" filename = "image" onChange = {e=>setImage(e.target.files[0])}/>

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
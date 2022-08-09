import React, { useEffect, useState } from "react";
import axios from 'axios';
import ac from './addcomment.module.css'
import {useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useParams, useLocation } from "react-router-dom";


const AddComment = (props)=>{
    const state = useLocation();
    console.log(state.state)
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    let [comment, setComment] = useState('');

    useEffect(()=>{
        if(!user.loggedIn) navigate('/login');
    },[]);
    const submitHandler = async e=>{
        e.preventDefault();
        const res = axios.post('https://slambook01.herokuapp.com/comments/new',{...state.state, comment});
        navigate(`/profile/${state.state.parentID}`);

    }
    return <div className="body">
    <div className={ac.background}>
    </div>
    <form onSubmit={submitHandler}>
        <h3>Add Comment</h3>
        <textarea className = {ac.text} placeholder = "Comment" value = {comment} onChange = {e=> setComment(e.target.value)}></textarea>

        <button type = "submit">Add</button>
        <button onClick={()=>{navigate(`/profile/${state.state.parentID}`)}}>Cancel</button>
    </form>
    </div>
};

export default AddComment;
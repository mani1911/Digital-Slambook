import React, { useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { selectUser } from "../features/userSlice";
import {useNavigate} from 'react-router-dom';
import img from '../assets/userImage.png';
import classes from './profile.module.css';
import CommentList from "./commentList";
const Profile = ()=>{
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    useEffect(()=>{
        if(user.loggedIn === false){
            navigate('/login');
        }
    },[])

    return <div className = {classes.grid}>
        <div className = {classes.details}>
            <h1>User Profile</h1>
            <img src= {img}/>
            <h2>{user.name}</h2>
            <h3>{user.department}</h3>
            <h4>{user.description}</h4>
        </div>
        <div className= {classes.comments}>
            <h2>Comments</h2>
            <CommentList userID = {user._id}/>
        </div>
    </div>
}

export default Profile;
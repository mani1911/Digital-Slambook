import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { selectUser } from "../features/userSlice";
import {useNavigate , useParams} from 'react-router-dom';
import classes from './profile.module.css';
import img from '../assets/userImage.png';
import CommentList from "./commentList";
import axios from 'axios';

const ViewProfile = (props)=>{
    const {id} = useParams();
    console.log(id);
    const [userProfile, setUserProfile] = useState('');
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    useEffect(()=>{
        async function check(){
            const res = await axios.get(`http://localhost:3002/user/${id}`);
            setUserProfile(res.data.user[0]);
        }
        check();
    },[id])

    return <div className = {classes.grid}>
    <div className = {classes.details}>
        <h1>User Profile</h1>
        <img src= {img}/>
        <h2>{userProfile.name}</h2>
        <h3>{userProfile.department}</h3>
        <h4>{userProfile.description}</h4>
    </div>
    <div>
        <h2>Comments</h2>
        <div className={classes.comments}>
            <CommentList userID = {id}/>
        </div>

    </div>
</div>
}


export default ViewProfile;
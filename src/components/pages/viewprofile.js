import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { selectUser } from "../features/userSlice";
import {useNavigate , useParams} from 'react-router-dom';
import vp from './viewprofile.module.css';
import img from '../assets/userImage.png';
import CommentList from "./commentList";
import axios from 'axios';
import { BiCommentAdd } from "react-icons/bi";

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

    const addCommentHandler = ()=>{
        navigate(`/profile/${userProfile._id}/comment`, {state : {userID : user._id, parentID : userProfile._id, time :Date.now(), user : user.name}});
    }
    return <div className = {vp.grid}>
    <div className = {vp.details}>
        <h1>User Profile</h1>
        <img src= {img}/>
        <h2>{userProfile.name}</h2>
        <h3>{userProfile.department}</h3>
        <h4 className = {vp.description} >{userProfile.description}</h4>
    </div>
    <div>
        <h2>Comments</h2>
        <div className={vp.comments}>
            <CommentList userID = {id}/>
        </div>
        {user._id !== userProfile._id?<button onClick = {addCommentHandler} className={vp.addcomment}>Comment<BiCommentAdd className={vp.ci}/></button>:null}

    </div>
</div>
}


export default ViewProfile;
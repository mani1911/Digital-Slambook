import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { selectUser } from "../.././features/userSlice";
import {useNavigate , useParams} from 'react-router-dom';
import vp from './viewprofile.module.css';
import img from '../../assets/userImage.png';
import CommentList from "../comments/commentList";
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
            const res = await axios.get(`https://slambook01.herokuapp.com/user/${id}`);
            setUserProfile(res.data.user[0]);
        }
        check();
    },[id])

    const addCommentHandler = ()=>{
        navigate(`/profile/${userProfile._id}/comment`, {state : {userID : user._id, parentID : userProfile._id, time :Date.now(), user : user.name}});
    }
    let base64String = null;
    if(userProfile.image){
        base64String = btoa(new Uint8Array(userProfile.image.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));
    }

    return <div className = {vp.grid}>
    <div className = {vp.details}>
        <h1>User Profile</h1>
        {!base64String?<img src= {img}/> : <img src = {`data:image/png; base64,${base64String}`}/>}
        <h2>{userProfile.name}</h2>
        <h3 className={vp.year}>{userProfile.year} - {userProfile.year + 4}</h3>
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
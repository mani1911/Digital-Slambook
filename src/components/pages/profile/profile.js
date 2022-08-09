import React, { useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { selectUser } from "../../features/userSlice";
import {useNavigate} from 'react-router-dom';
import img from '../../assets/userImage.png'
import classes from './profile.module.css';
import CommentList from "../comments/commentList";
import { BiEditAlt } from "react-icons/bi";
const Profile = ()=>{
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    let base64String = null;
    useEffect(()=>{
        if(user.loggedIn === false){
            navigate('/login');
        }
    },[])
    if(user.image){
        base64String = btoa(new Uint8Array(user.image.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));
    }


    const editHandler = ()=>{
        navigate('/profile/edit');
    }
    return <div className = {classes.grid}>
        <div className = {classes.details}>
            <h1>User Profile</h1>
            <div className={classes.im}>
                {!base64String?<img src= {img}/> : <img src = {`data:image/png; base64,${base64String}`}/>}
                <BiEditAlt onClick = {editHandler} className={classes.icon}/>
            </div>

            <h2>{user.name}</h2>
            <h3 className={classes.year}>{user.year} - {user.year + 4}</h3>
            <h3>{user.department}</h3>
            <h4 className= {classes.description}>{user.description}</h4>
        </div>
        <div>
            <h2>Comments</h2>
            <div className={classes.comments}>
                <CommentList userID = {user._id}/>
            </div>

        </div>
    </div>
}

export default Profile;
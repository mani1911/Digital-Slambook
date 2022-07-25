import React, { useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { selectUser } from "../features/userSlice";
import {useNavigate} from 'react-router-dom';
const Profile = ()=>{
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    useEffect(()=>{
        if(user.loggedIn === false){
            navigate('/login');
        }
    },[])

    return <>
        <h1>User Profile</h1>
        <h2>Name : {user.name}</h2>
    </>
}

export default Profile;
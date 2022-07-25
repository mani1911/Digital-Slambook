import React from "react";
import { useSelector } from "react-redux/es/exports";
import { selectUser } from "../features/userSlice";

const Profile = ()=>{
    const user = useSelector(selectUser);
    return <>
        <h1>User Profile</h1>
        <h2>Name : {user.name}</h2>
    </>
}

export default Profile;
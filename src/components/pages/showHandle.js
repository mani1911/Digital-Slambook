import React from "react";
import show from './showHandle.module.css';
import { Link } from "react-router-dom";
const ShowHandle = (props)=>{
    return(
    <div className = {show.wrapp}>
        <Link className = {show.links} to = {`/profile/${props.id}`}>
            <div className={show.name}>{props.name}</div>
            <div className={show.dept}>{props.dept}</div>
            <div className={show.year}>{props.year} - {props.year + 4}</div>
        </Link>
    </div>
)}

export default ShowHandle;
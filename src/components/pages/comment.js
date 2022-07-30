import React from "react";
import {Link} from "react-router-dom";
import classes from './comment.module.css';
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
const Comment = (props)=>{
    const user = useSelector(selectUser);
    return<>
        <div className={classes.commentBox}>
            <Link className = {classes.link} to = {`/profile/${props.userID}`}><div>{props.user}</div></Link>
            <div className={classes.comment}>{props.comment}</div>
        </div>
    </>
}

export default Comment;
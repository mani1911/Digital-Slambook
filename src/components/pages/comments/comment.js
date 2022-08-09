import React from "react";
import {Link} from "react-router-dom";
import classes from './comment.module.css';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { BsFillTrashFill } from "react-icons/bs";
const Comment = (props)=>{
    const user = useSelector(selectUser);
    const time = new Date(props.time);
    const year = time.getFullYear();
    const month = time.getMonth();
    const day = time.getDate();
    const date = `${day}-${month+1}-${year}`;

    const deleteHandler = ()=>{
        const details = {userID : props.userID, parentID : props.parentID, id : props.id};
        props.deleteHandler(details);
    }
    return<>
    <div className={classes.wrap}>
    <div className={classes.commentBox}>
        <Link className = {classes.link} to = {`/profile/${props.userID}`}><div>{props.user}<span className={classes.date}>{date}</span></div></Link>
        <div className={classes.comment}>{props.comment}</div>
    </div>
    <BsFillTrashFill onClick = {deleteHandler} className={classes.del}/>
    </div>



    </>
}

export default Comment;
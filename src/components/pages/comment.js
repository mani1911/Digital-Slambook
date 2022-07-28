import React from "react";
import classes from './comment.module.css'
const Comment = (props)=>{
    return<>
        <div className={classes.commentBox}>
            <div className={classes.user}>{props.user}</div>
            <div className={classes.comment}>{props.comment}</div>
        </div>
    </>
}

export default Comment;
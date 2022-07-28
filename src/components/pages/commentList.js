import React, { useEffect ,useState} from "react";
import axios from 'axios';
import { useSelector } from "react-redux/es/exports";
import { selectUser } from "../features/userSlice";
import Comment from "./comment";

const CommentList = (props)=>{
    const user = useSelector(selectUser);
    const [commentList, getCommentList] = useState([]);
    useEffect(()=>{
        async function getComments(){
            let res = await axios.get(`http://localhost:3002/comments/${props.userID}`);
            console.log(res.data.comments);
            getCommentList(res.data.comments);
        }
        getComments();
    },[])
    return<div>
        {commentList.map(comment => <Comment key = {comment.userID} comment = {comment.comment} user = {comment.user} />)}
    </div>
}

export default CommentList;
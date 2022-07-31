import React, { useEffect ,useState} from "react";
import axios from 'axios';
import { useSelector } from "react-redux/es/exports";
import { selectUser } from "../features/userSlice";
import Comment from "./comment";

const CommentList = (props)=>{
    const user = useSelector(selectUser);
    const [commentList, getCommentList] = useState([]);
    const deleteHandler = async(details)=>{
        if(details.userID === user._id || details.parentID === user._id){
            const res = await axios.post(`http://localhost:3002/comments/delete/${details.id}`);
            const filteredCommentList = commentList.filter(comment => comment._id !== details.id);
            getCommentList(filteredCommentList);
            console.log(res.data)
            alert(res.data.message);
        }
        else{
            alert('You do not have access to delete this comment');
        }
    }
    useEffect(()=>{
        async function getComments(){
            let res = await axios.get(`http://localhost:3002/comments/${props.userID}`);
            getCommentList(res.data.comments);
        }
        getComments();
    },[props.userID])
    return<div>
        {commentList.map(comment => <Comment id = {comment._id} deleteHandler = {deleteHandler} key = {comment._id} time = {comment.time} userID = {comment.userID} parentID = {comment.parentID} comment = {comment.comment} user = {comment.user} />)}
    </div>
}

export default CommentList;
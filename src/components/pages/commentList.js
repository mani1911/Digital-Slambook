import React, { useEffect ,useState} from "react";
import axios from 'axios';
import { useSelector } from "react-redux/es/exports";
import { selectUser } from "../features/userSlice";
import Comment from "./comment";
import Modal from "../ui/Modal";

const CommentList = (props)=>{
    const user = useSelector(selectUser);
    let [message, setMessage] = useState('');
    let [openModal, setOpenModal] = useState(false);
    const [commentList, getCommentList] = useState([]);
    const deleteHandler = async(details)=>{
        if(details.userID === user._id || details.parentID === user._id){
            const res = await axios.post(`https://slambook01.herokuapp.com/comments/delete/${details.id}`);
            const filteredCommentList = commentList.filter(comment => comment._id !== details.id);
            getCommentList(filteredCommentList);
            setMessage(res.data.message);
            setOpenModal(true);
        }
        else{
            setMessage('You do not have access to delete this comment');
            setOpenModal(true);

        }
    }
    useEffect(()=>{
        async function getComments(){
            let res = await axios.get(`https://slambook01.herokuapp.com/comments/${props.userID}`);
            getCommentList(res.data.comments);
        }
        getComments();
    },[props.userID])
    return<div>
        {openModal? <Modal open = {openModal} message = {message} toggleModal = {()=> setOpenModal(false)} /> : null}
        {commentList.map(comment => <Comment id = {comment._id} deleteHandler = {deleteHandler} key = {comment._id} time = {comment.time} userID = {comment.userID} parentID = {comment.parentID} comment = {comment.comment} user = {comment.user} />)}
    </div>
}

export default CommentList;
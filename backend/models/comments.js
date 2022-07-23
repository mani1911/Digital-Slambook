import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    by : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    at : {type : mongoose.Schema.Types.ObjectId , ref : 'User'},
    likes : 'Number'
});

const Comments = new mongoose.model('Comments', commentSchema);

export default Comments;
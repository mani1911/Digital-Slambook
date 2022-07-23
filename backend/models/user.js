import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id : {
        type : 'String',
        required : true
    },
    name : {
        type : 'String',
        required : true
    },
    password : {
        type : 'String',
        required : true
    }
});

const User = new mongoose.model('User', userSchema);

export default User;
import express from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user.js';
const router = express.Router();


router.post('/reg', async (req,res)=>{
    try{
        const { username, name, password , description, department } = req.body;
        const existing = await User.find({username});
        let message = '';
        let status = 0;
        if(existing.length > 0){
            message = 'User Already Exists';
            console.log(message);
        }
        else{
            const hash = await bcrypt.hash(password,12);
            const newUser = new User({username,password : hash,name, description, department});
            await newUser.save();
            console.log(newUser);
            message = 'User Registered';
            status = 1;
        }
        res.json({status, message});
    }
    catch(error){
        console.log(error.message);
    }
});

router.post('/login', async (req,res)=>{
    const { username , password } = req.body;
    try{
        const user = await User.findOne({username});
        let message = '';
        let status = 0;
        if(user){
            const isValidUser = await bcrypt.compare(password, user.password);
            if(isValidUser){
                req.session.user_id = user._id;
                console.log(req.session.user_id);
                message = 'Logged in Successfully';
                status = 1;
            }
            else{
                message = 'Incorrect Username or Password';
            }
        }
        console.log(user);
        res.json({status,message,user})
    }
    catch(e){
        console.log(e.message)
    }

});

router.post('/logout', (req,res)=>{
    try{
        if(req.session.user_id){
            req.session.user_id = null;
            res.json('Logged out Successfully');
        }
    }
    catch(e){
        console.log(e.message);
    }
    res.json({message : 'Successfully Logged Out'});
    
})

export default router;
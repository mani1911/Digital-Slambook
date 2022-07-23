import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
const router = express.Router();
router.post('/reg', async (req,res)=>{
    try{
        const { id,name, password } = req.body;
        const existing = await User.find({name});
        let message = '';
        let status = 0;
        if(existing.length > 0){
            message = 'User Already Exists';
            console.log(message);
        }
        else{
            const hash = await bcrypt.hash(password,12);
            const newUser = new User({id,name,password : hash});
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
    const { name , password } = req.body;
    try{
        const user = await User.findOne({name});
        let message = '';
        let status = 0;
        if(user){
            const isValidUser = await bcrypt.compare(password, user.password);
            if(isValidUser){
                req.session.user_id = user._id;
                console.log(req.session.user_id)
                message = 'Logged in Successfully';
                status = 1;
            }
            else{
                message = 'Incorrect Username or Password';
            }
        }
        res.json({status,message})
    }
    catch(e){
        console.log(e.message)
    }

});

export default router;
import Express from "express";
import bcrypt from 'bcrypt';
const userRoute = Express.Router();
import User from '../models/user.js';

userRoute.get('/',async (req,res)=>{
    try{
        const userArray = await User.find();
        res.json({data : userArray});
    }
    catch(e){
        console.log(e.message);
    }

})
userRoute.post('/reg', async (req,res)=>{
    try{
        const { username, name, password , description, department ,year} = req.body;
        const existing = await User.find({username});
        let message = '';
        let status = 0;
        if(existing.length > 0){
            message = 'User Already Exists';
            console.log(message);
        }
        else if(!username || !name || !password || ! description || !department || !year){
            message = 'Input Field cannot be Empty';
        }
        else{
            const hash = await bcrypt.hash(password,12);
            const newUser = new User({username,password : hash,name, description, department, year});
            await newUser.save();
            message = 'User Registered';
            status = 1;
        }
        res.json({status, message});
    }
    catch(error){
        console.log(error.message);
    }
});
    
userRoute.post('/login', async (req,res)=>{
    const { username , password } = req.body;
    try{
        if(!username || !password){
            res.json({status : 0, message : 'No Input Field can be Empty'});
            return;
        }
        let message = 'Incorrect Username or Password';
        let status = 0;
        if(!username || !password){
            message = 'No Input Field can be Empty';
        }
        const user = await User.findOne({username});
        if(user){
            const isValidUser = await bcrypt.compare(password, user.password);
            if(isValidUser){
                message = 'Logged in Successfully';
                status = 1;
            }
        }
        res.json({status,message,user})
    }
    catch(e){
        console.log(e.message)
    }

});

userRoute.post('/logout', (req,res)=>{
    try{
        res.json({message : 'Successfully Logged Out'});
        
    }
    catch(e){
        console.log(e.message);
    }
    
});

userRoute.get('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.find({_id : id});
        res.json({user});
    }
    catch(e){
        console.log(e.message);
    }

})

userRoute.post('/edit', async (req,res)=>{
    try{
        const {id,name,department, description ,year} = req.body;
        if(!id || !name || !department || !description || !year){
            return;
        }

        const user = await User.findOneAndUpdate({_id :id}, {name, department, description, year});
        res.json({message : 'Changes Successfully Updated'});
    }
    catch(e){
        console.log(e.message);
    }
})

export default userRoute;

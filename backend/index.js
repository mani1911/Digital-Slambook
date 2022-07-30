import Express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import User from "./models/user.js";
import Comments from './models/comments.js';
import cookieParser from "cookie-parser";
import session, { MemoryStore } from "express-session";
const app = Express();
const Port = process.env.Port || 3002;
const URL = 'mongodb+srv://mani19112003:mani19112003@cluster0.bj3en.mongodb.net/?retryWrites=true&w=majority';

app.use(cookieParser());
app.use(session({
    name : 'app.sid',
    secret: 'mani1911', 
    resave : false, 
    saveUninitialized : true,
    store : new MemoryStore(),

}));
app.use(cors());
app.use(Express.json());

app.use(bodyParser.urlencoded({
    extended: true
  }));

mongoose.connect(URL, {useNewUrlParser : true, useUnifiedTopology : true})
.then(()=>{
    app.listen(Port, ()=>{
        console.log(`Connection Established : ${Port}`);
    })
})
.catch(e=>{
    console.log(e.message);
});

app.post('/user/reg', async (req,res)=>{
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
    
app.post('/user/login', async (req,res)=>{
    const { username , password } = req.body;
    try{
        const user = await User.findOne({username});
        req.session.userID = user;
        console.log(req.session.userID)
        let message = 'Incorrect Username or Password';
        let status = 0;
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

app.post('/user/logout', (req,res)=>{
    try{
        req.session.destroy();
        res.json({message : 'Successfully Logged Out'});
        
    }
    catch(e){
        console.log(e.message);
    }
    
});

app.get('/user/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        console.log(id);
        const user = await User.find({_id : id});
        console.log(user);
        res.json({user});
    }
    catch(e){
        console.log(e.message);
    }

})


app.post('/user/isLogged', async (req,res)=>{
    try{
        const user = req.session.userID;
        console.log(req.session.userID);
        res.json({user});
    }
    catch(e){
        console.log(e.message);
    }
})

app.get('/comments/:id',async (req,res)=>{
    const id = req.params.id;
    console.log(id)
    const comments = await Comments.find({parentID : id});
    console.log(comments)
    res.json({comments});
});

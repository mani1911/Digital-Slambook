import Express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from "mongoose";
import router from "./routes/auth.js";
import { comments } from "./routes/comment.js";
import session from "express-session";

const app = Express();
const Port = process.env.Port || 3002;
const URL = 'mongodb+srv://mani19112003:mani19112003@cluster0.bj3en.mongodb.net/?retryWrites=true&w=majority';

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(Express.json());
app.use(session({secret : 'mani1911',resave: false,saveUninitialized: true,cookie: { secure: true }}));
app.use('/user', router);
app.use('/comments', comments);

mongoose.connect(URL, {useNewUrlParser : true, useUnifiedTopology : true})
    .then(()=>{
        app.listen(Port, ()=>{
            console.log(`Connection Established : ${Port}`);
        })
    })
    .catch(e=>{
        console.log(e.message);
    });

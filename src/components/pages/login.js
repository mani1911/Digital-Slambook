import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import {login} from '../features/userSlice';
import {Link} from 'react-router-dom';
import logincss from './login.module.css';
import Spinner from "../ui/Spinner";
const Login = ()=>{
    let navigate = useNavigate();
    let [username, setUserName] = useState('');
    let [password, setPassword] = useState('');
    let [isLoading , setIsLoading] = useState(false);
    let URL = 'http://localhost:3002/user/login';

    const dispatch = useDispatch();

    const submitHandler = async e=>{
        setIsLoading(true);
        e.preventDefault();
        const res = await axios.post(URL, {username, password});
        if(res.data.status === 1){
            setTimeout(()=>{
                setIsLoading(false);
                navigate(`/profile`);
                dispatch(
                    login({
                        ...res.data.user,
                        loggedIn : true,
                    })
                );
            },2000);
        }
        else{
            setIsLoading(false);
            setUserName('');
            setPassword('');
            alert(res.data.message)
        }
    }
    return <div className="body">
    <div className={logincss.background}>
    </div>
    <form onSubmit={submitHandler}>
        <h3>Login Here</h3>

        <label>Username</label>
        <input value ={username} type="text" placeholder="Username" onChange = {e=>setUserName(e.target.value)}/>

        <label>Password</label>
        <input value = {password} type="password" placeholder="Password" onChange = {e=>setPassword(e.target.value)}/>

        {isLoading?<Spinner/>:<button type = "submit">Log In</button>}
        <Link to = "/register"><div className={logincss.link}>Not a User? Register Here</div></Link>
    </form>
    </div>
}

export default Login;
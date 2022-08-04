import React, {useEffect, useState} from "react";
import home from './home.module.css';
import axios from "axios";
import ShowHandle from "./showHandle";
import { BiSearch } from "react-icons/bi";

const Home = ()=>{
    let [resArray, setResArray] = useState([]);
    let [filteredArray, setFilteredArray] = useState([]);
    let [filter, setFilter] = useState('');
    let [isLoading, setIsLoading] = useState('');
    useEffect(()=>{
        setIsLoading(true);
        async function getFunction(){
            const res = await axios.get('https://slambook01.herokuapp.com/user');
            setResArray(res.data.data);
            setFilteredArray(res.data.data);
        }
        getFunction();
        setIsLoading(false);
    },[]);
    const searchHandler = (e)=>{
        e.preventDefault();
        setFilter(e.target.value.toLowerCase());
        if(filter === '') setFilteredArray(resArray);
        else{
            const filteredContacts = resArray.filter(data=>{
                return Object.values(data).join(" ").toLowerCase().includes(filter);
            });
            setFilteredArray(filteredContacts);
        }
    }
    return <div className={home.wrapper}>
        <h1 className={home.heading}>Find the People you know in College</h1>
        <div className={home.search}>
            <BiSearch className={home.icon}/>
            <input  value = {filter} placeholder = "Search by Name, Department ,Year" className={home.input} onChange = {searchHandler}></input>
        </div>
        <div className={home.profiles}>

            {filteredArray.length ===0? <p>No Results Found</p>:filteredArray.map(data => <ShowHandle key = {data._id} id = {data._id} name = {data.name} dept = {data.department} year = {data.year}/>)}
        </div>
        
    </div>
}

export default Home;
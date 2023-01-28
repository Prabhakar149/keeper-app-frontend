import React, { useState } from "react";
import "./Login.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Login(props) {

    const [user, setUser] = useState({
        emailId:"",
        password:""
    });
    const navigate = useNavigate();

    function handleChange(event){
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]:value
        });
    }

    function handleClick(){
        const {emailId, password} = user;
        if(emailId && password){
            axios.post("https://keeper-app-backend.vercel.app/login", user).then((res)=>{
                alert(res.data.message);
                if(res.data.user){
                    props.setMyUser(res.data.user);
                    navigate("/create");
                }
                
            });
        }else{
            alert("Invalid inputs");
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="email" name="emailId" placeholder="Enter your email" onChange={handleChange} value={user.emailId}></input>
            <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} value={user.password}></input>
            <div className="button" onClick={handleClick}>Login</div>
            <div className="orText">or</div>
            <div className="button" onClick={()=>{navigate("/register")}}>Register</div>
        </div>
    );
}

export default Login;
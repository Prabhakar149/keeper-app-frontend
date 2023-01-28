import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        reEnterPassword:""
    });

    function handleChange(event){
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]:value
        });
    }

    function handleClick(){
        const {name, email, password, reEnterPassword} = user;
        if(name && email && password && reEnterPassword){
            if(password === reEnterPassword){
                axios.post("https://keeper-app-backend.vercel.app/register",user).then((res)=>{
                    alert(res.data.message);
                    navigate("/login");
                });  
            }else{
                alert("Password didn't match");
            }
        }else{
            alert("Invalid inputs");
        }
    }

    return (
        <>
        <div className="register">
            <h1>Register</h1>
            <input type="text" name="name" placeholder="Enter your name" onChange={handleChange} value={user.name}></input>
            <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} value={user.email}></input>
            <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} value={user.password}></input>
            <input type="password" name="reEnterPassword" placeholder="Re-Enter your password" onChange={handleChange} value={user.reEnterPassword}></input>
            <div className="button" onClick={handleClick}>Register</div>
            <div className="orText">or</div>
            <div className="button" onClick={()=>{navigate("/login")}}>Login</div>
        </div>
        </>
    );
}

export default Register;
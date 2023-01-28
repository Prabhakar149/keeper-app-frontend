import React from "react";
import "./Home.css";
import Header from "../Header/Header";
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <div className="homeHead">
                <div className="container">
                    <h2 className="myContent">Already registered?</h2>
                    <h4 className="myContent" onClick={()=>{navigate("/login")}}>Login</h4>
                    <hr></hr>
                    <h2 className="myContent">Not registered?</h2>
                    <h4 className="myContent" onClick={()=>{navigate("/register")}}>Register</h4>
                </div>
            </div>

        </>
    );
}
export default Home;
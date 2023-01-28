import React, { useState } from "react";
import Home from "./Home/Home";
import Login from "./Loginpage/Login";
import Register from "./Registerpage/Register";
import Createarea from "./CreateArea/Createarea";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Card from "./Card/Card";
import LoggedinUser from "./LoggedInUser/LoggedinUser";

function App() {

  const [user, setUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  return (
    <>
    
      <div className="container">

        <Router>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login setMyUser={setUser}/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            {
              (user && user._id) 
               ? <Route exact path="/create" element={<Createarea user={user} setMyUser={setUser}/>}></Route>
               : <Route path="/" element={<Home/>}></Route>
            }
            <Route path="/card" element={<Card user={user} setUpdatedUser={setUpdatedUser}/>}></Route>         
            <Route path="/loggedinUser" element={<LoggedinUser updatedUser={updatedUser}/>}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import "./Card.css";
function Card(props) {
    const location = useLocation();
    const navigate = useNavigate();
    
    const currentUserId = location.state.userId;
    const [newTitle, setNewTitle] = useState(location.state.title);
    const [newContent, setNewContent] = useState(location.state.content);
    
    console.log(location.state.noteId);

    function onChangeElementTitle(e){
        const changedTitle = e.currentTarget.textContent;
        setNewTitle(changedTitle);
    }
    function onChangeElementContent(e){
        const changedContent = e.currentTarget.textContent;
        setNewContent(changedContent);
    }
   
    const updatedNoteWithUserId = [location.state.id, currentUserId, newTitle, newContent, location.state.noteId];

    function updateUser() {
        const loggedInUser = props.user;
        axios.post("https://keeper-app-backend.vercel.app/updateNote", loggedInUser).then((res) => {
            console.log(res.data.currentUser);
            const currentUser = res.data.currentUser;
            props.setUpdatedUser(currentUser);
            navigate("/loggedinUser");
        });
    }

    function handleClick(){
        if(newTitle){
            axios.post("https://keeper-app-backend.vercel.app/noteUpdate", updatedNoteWithUserId).then((res) => {
                alert(res.data.message);
                updateUser();
            });
        }else{
            alert("please enter title atleast");
        }
    }
    
    function backClick(){
        updateUser();
    }
    
    return <>
        <Header/>
        <div className="myCardDiv">
                <h1 className="myCardHead">{location.state.name}</h1>
                <p onClick={()=>{navigate("/login")}}>Log Out</p>
        </div>
        <div className="myCard">
            <h1 contentEditable="true" name="title" onInput={onChangeElementTitle}>{location.state.title}</h1>
            <p contentEditable="true" name="content" onInput={onChangeElementContent}>{location.state.content}</p>
            <div className="cardDivClick" onClick={handleClick}>click here to update</div>
            <div className="cardButton" onClick={backClick}>Back</div>
        </div>

    </>

}

export default Card;
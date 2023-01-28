import React, { useState } from "react";
import "./Createarea.css";
import Header from "../Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Createarea(props) {

    const navigate = useNavigate();
    const myNotes = props.user.notes;
    const [userNotes, setUserNotes] = useState(myNotes);

    const [note, setNote] = useState({
        title: "",
        content: ""

    });

    function handleChange(event) {
        const { name, value } = event.target;
        setNote({
            ...note,
            [name]: value
        });
    }
    function updateUser() {
        const loggedInUser = props.user;
        axios.post("https://keeper-app-backend.vercel.app/updateNote", loggedInUser).then((res) => {
            setUserNotes(res.data.currentUser.notes);
        });
    }

    function clickHandle() {
        const { title, content } = note;
        const loggedInUser = props.user;
        const userNote = [loggedInUser, note];
        if (title && content) {
            axios.post("https://keeper-app-backend.vercel.app/create", userNote).then((res) => {
                alert(res.data.message);
                setNote({ title: "", content: "" });
                updateUser();
            });
        } else {
            alert("Please enter title and content");
        }
    }

    function deleteClick(e) {
        const loggedInUser = props.user;
        const currentNote = e.currentTarget.id;
        const myUserCurrentNote = [loggedInUser, currentNote];
        axios.post("https://keeper-app-backend.vercel.app/delete", myUserCurrentNote).then((res) => {
            alert(res.data.message);
            updateUser();
        });
    }


    function noteClick(e){
        const index = e.currentTarget.id;
        const myTitle = userNotes[index].title;
        const myContent = userNotes[index].content;
        const myNoteId = userNotes[index]._id;
        const myName = props.user.name;
        const userId = props.user._id;
        navigate("/card",{state:{id:index, noteId:myNoteId, name:myName, title:myTitle, content:myContent, userId:userId}});
        
    }

    return (
        <>
            <Header />
            <div className="myHead">
                <h1 className="myCreateHead">{props.user.name}</h1>
                <p onClick={()=>{navigate("/login")}}>Log Out</p>
            </div>
            <div>
                <form className="create-note">
                    <input type="text" name="title" placeholder="Title" onChange={handleChange} value={note.title}></input>
                    <textarea name="content" placeholder="Write your note.." onChange={handleChange} value={note.content}></textarea>
                    <div className="button" onClick={clickHandle}>Add</div>
                </form>
            </div>
            {
    userNotes.map((realNote, index) => {
        return (
            <>
            <div className="note" >
                <h1>{realNote.title}</h1>
                <p>{realNote.content.substring(0, 15) + "...."}</p>
                <div className="divClick" onClick={noteClick} id={index}>click here</div>
                <div className="noteButton"
                     onClick={deleteClick}
                     key={index}
                     id={realNote._id}>Delete
                </div>
             </div>
            
            </>
           
        );

    })

}
            

        </>

    );
}



export default Createarea;





// {
//     userNotes.map((realNote, index) => {
//         return (
//             <div className="note">
//                 <h1>{realNote.title}</h1>
//                 <p>{realNote.content}</p>
//                 <div className="noteButton"
//                      onClick={deleteClick}
//                      key={index}
//                      id={realNote._id}>Delete
//                 </div>
//         </div>
//         );
//     })
// }
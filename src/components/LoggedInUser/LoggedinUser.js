import React from "react";
import Createarea from "../CreateArea/Createarea";

function LoggedinUser(props){
    
    return <Createarea user={props.updatedUser}/>;
}
export default LoggedinUser;
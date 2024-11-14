import React from "react";
import { Link } from "react-router-dom";
import "./sideStyle.css"
const Side = () => {
  return (
    <div>
      <Link to={"/home/profile"} onClick={()=>{
        if (localStorage.getItem('postId')) {
          localStorage.removeItem('postId')
        }
      }}>profile</Link>
      <br></br>
      <Link to={"/home/"} onClick={()=>{
        if (localStorage.getItem('postId')) {
          localStorage.removeItem('postId')
        }
      }}>Feeds</Link>
     
    </div>
  );
};

export default Side;

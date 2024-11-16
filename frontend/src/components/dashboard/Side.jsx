import React from "react";
import { Link } from "react-router-dom";
import "./sideStyle.css";
const Side = () => {
  return (
    <div>
      <Link
        to={"/home/profile"}
        onClick={() => {
          if (localStorage.getItem("postId")) {
            localStorage.removeItem("postId");
          }
        }}
      >
        profile
      </Link>
      <br></br>
      <Link to={"/home/explore"}>#Explore</Link>
      <br></br>

      <Link to={"/home/"} onClick={()=>{
        if (localStorage.getItem('postId')) {
          localStorage.removeItem('postId')
        }
      }}>Feeds</Link>
      <br></br>
      <Link
        to={"/home/events"}
        onClick={() => {
          if (localStorage.getItem("eventId")) {
            localStorage.removeItem("eventId");
          }
        }}
      >
        Events
      </Link>
      <br></br>
      <Link to={'./bookmark'}>Bookmarks</Link>
    </div>
  );
};

export default Side;

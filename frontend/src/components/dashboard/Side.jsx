import React from "react";
import { Link } from "react-router-dom";
import "./sideStyle.css";
import { Logout } from "../redux/reducers/auth";
const Side = () => {
  const user_id=localStorage.getItem("user_id")
  const handleLogout = () => {
    dispatch(Logout());
  };
  return (
    <div>
      <Link
        to={`/home/profile/${user_id}`}
        onClick={() => {
          if (localStorage.getItem("postId")) {
            localStorage.removeItem("postId");
          }
        }}
      >
        profile
      </Link>
      <br></br>
      <Link to={"/home/explore"}>Explore</Link>
      <br></br>

      <Link
        to={"/home/"}
        onClick={() => {
          if (localStorage.getItem("postId")) {
            localStorage.removeItem("postId");
          }
        }}
      >
        Feeds
      </Link>
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
      <Link to={"./bookmark"}>Bookmarks</Link>


      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <button onClick={handleLogout} className="LogoutButton">
          logout
        </button>
    </div>
  );
};

export default Side;

import React from "react";
import { Link } from "react-router-dom";
import "./sideStyle.css"
const Side = () => {
  return (
    <div>
      <Link to={"/home/profile"}>profile</Link>
      <br></br>
      <Link to={"/home/"}>Feeds</Link>
      <br></br>
      <Link to={"/home/explore"}>#Explore</Link>
     
    </div>
  );
};

export default Side;

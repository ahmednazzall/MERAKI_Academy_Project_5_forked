import React, { useEffect } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Logout } from "../redux/reducers/auth";
import axios from "axios";
import Posts from "../posts/Posts";
import Side from "./Side";
import Events from "../events/events";

const Home = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(Logout());
  };
  const isLoggedIn = useSelector((auth) => {
    return auth.auth.isLoggedIn;
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="parent">
      <div className="nav">
        {" "}
        <img src="../../Preview.png" className="MoltaqaIcon" />
        <button onClick={handleLogout} className="LogoutButton">
          logout
        </button>
      </div>
      <div className="org">
        <div className="sidebar">
          <Side />
        </div>
        <div className="content">
          <Outlet />
        </div>
        

        <div className="messages">messages here</div>
      </div>

      <br></br>

      {/* <Posts /> */}
    </div>
  );
};

export default Home;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Logout } from "../redux/reducers/auth";
import "./home.css";
import Side from "./Side";
import Search from "../search/Search";

const Home = () => {
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((auth) => auth.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="parent">
      <div className="nav">
        <img src="../../Preview.png" className="MoltaqaIcon" />
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
      </div>
      <div className="org">
        {/* <div className="sidebar"> */}
          <Side />
        {/* </div> */}
        {/* <div className="content"> */}
          <Outlet />
        {/* </div> */}
        {/* <div className="messages">Messages here</div> */}
      </div>
    </div>
  );
};

export default Home;

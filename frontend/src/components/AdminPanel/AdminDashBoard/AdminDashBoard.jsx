import React, { useEffect } from "react";
import "./dashboard.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminSide from "./AdminSide";
import axios from "axios";
import { getAllUsers } from "../../redux/reducers/sliceUser";

const AdminDashBoard = () => {
  const navigate = useNavigate();
 
  const users = useSelector((users) => {
    return users.users.users;
  });
  const isLoggedIn = useSelector((auth) => {
    return auth.auth.isLoggedIn;
  });
  const AdminProfile = users.find((user) => {
    return user?.role_id === 1;
  });
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="parent">
      <div className="AdNav">
        {" "}
        <img src="../../Preview.png" className="MoltaqaIcon" />
        <h3>Hi {AdminProfile?.user_name}</h3>
      </div>
      <div className="org">
        <div className="sidebar">
          <AdminSide />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>

      <br></br>
    </div>
  );
};

export default AdminDashBoard;

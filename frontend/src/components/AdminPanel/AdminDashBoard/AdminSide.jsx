import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/reducers/auth";
import "./dashBoard.css";
import axios from "axios";
import { BiSolidDashboard } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { FaArrowRightFromBracket } from "react-icons/fa6";

import { BiSolidReport } from "react-icons/bi";
import { AiTwotoneFileAdd } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { getAllUsers } from "../../redux/reducers/sliceUser";
import { BsPersonLinesFill } from "react-icons/bs";
import { Button } from "antd";
const AdminSide = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("user_id");
  const [active, setActive] = useState(
    localStorage.getItem("active") || "Dashboard"
  );

  const users = useSelector((users) => {
    return users.users.users;
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:5000/users/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(getAllUsers(res.data.Users));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [users]);

  const handleLogout = () => {
    dispatch(Logout());
    axios
      .put(`http://localhost:5000/users/isNotlogin/false/${userId}`, {})
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChosen = (string) => {
    setActive(string);

    localStorage.setItem("active", string);
  };
  return (
    <div className="adminSide">
      <div>
        <div className={active == "Dashboard" ? "active" : "NotActive"}>
          <BiSolidDashboard
            style={{ cursor: "pointer" }}
            fontSize={"24px"}
            onClick={() => {
              navigate("/Admin/Panel");
              handleChosen("Dashboard");
            }}
          />
          <Link
            to={"/Admin/Panel"}
            onClick={() => {
              handleChosen("Dashboard");
            }}
          >
            Dashboard
          </Link>
        </div>

        <div className={active == "Users" ? "active" : "NotActive"}>
          <FaUsers
            fontSize={"24px"}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleChosen("Users");
              navigate("./users");
            }}
          />

          <Link
            to={"./users"}
            onClick={() => {
              handleChosen("Users");
            }}
          >
            Users
          </Link>
        </div>

        <div className={active == "Posts" ? "active" : "NotActive"}>
          <AiTwotoneFileAdd
            style={{ cursor: "pointer" }}
            fontSize={"24px"}
            onClick={() => {
              handleChosen("Posts");
              navigate("./posts");
            }}
          />

          <Link
            to={"./posts"}
            onClick={() => {
              handleChosen("Posts");
            }}
          >
            Posts
          </Link>
        </div>

        <div className={active == "Online users" ? "active" : "NotActive"}>
          <BsPersonLinesFill
            style={{ cursor: "pointer" }}
            fontSize={"24px"}
            onClick={() => {
              handleChosen("Online users");
              navigate("./Is/Login");
            }}
          />
          <Link
            to={"./Is/Login"}
            onClick={() => {
              handleChosen("Online users");
            }}
          >
            Online users{" "}
          </Link>
        </div>

        <div className={active == "Reports" ? "active" : "NotActive"}>
          <BiSolidReport
            style={{ cursor: "pointer" }}
            fontSize={"24px"}
            onClick={() => {
              handleChosen("Reports");
              navigate("./reports");
            }}
          />
          <Link
            to={"./reports"}
            onClick={() => {
              handleChosen("Reports");
            }}
          >
            Reports
          </Link>
        </div>
      </div>

      <div>
        <button className="logoutBTN" onClick={handleLogout}>
          <div>
            <FaArrowRightFromBracket
              style={{ cursor: "pointer" }}
              fontSize={"22px"}
            />
          </div>
          <p>Sign out</p>
        </button>
      </div>
    </div>
  );
};

export default AdminSide;

{
  /* <img src='../../../Preview.png'/>
        <div>
        <div>
            <h3 onClick={(e)=>{
                navigate('./users')
            }}>Users : {users.length}</h3>
        </div>
        <div>
            <h3 onClick={(e)=>{
                navigate('./posts')
            }}>Posts : {posts?.length || 0}</h3>
        </div>
        <div>
            <h3 onClick={(e)=>{
                navigate('./Is/Login')
            }}>Is Login : {isLogin.length}</h3>
        </div>
        <div>
            <h3 onClick={(e)=>{
                navigate('./Reports')
            }}>Reports</h3>
        </div>
        </div>
        <Outlet /> */
}

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "../../redux/reducers/auth";
import "./dashBoard.css"
import axios from "axios";


const AdminSide = () => {

    const dispatch = useDispatch();
    const userId=localStorage.getItem("user_id")

  const handleLogout = () => {
    dispatch(Logout());
    axios
      .put(`http://localhost:5000/users/isNotlogin/false/${userId}`, {})
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="adminSide">
      <Link to={"/Admin/Panel"}>Dashboard</Link>
      <br></br>
      <Link to={"./users"}>Users</Link>
      <br></br>
      <Link to={"./posts"}>Posts</Link>
      <br></br>
      <Link to={"./Is/Login"}>Logged in users </Link>
      <br></br>
      <Link to={"./reports"}>Reports</Link>
      <br></br>
      <button onClick={handleLogout} >
        logout
      </button>
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

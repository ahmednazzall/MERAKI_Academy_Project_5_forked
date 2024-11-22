import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "../../redux/reducers/auth";
import "./dashBoard.css"
import axios from "axios";


const AdminSide = () => {
    const dispatch = useDispatch();
    const userId=localStorage.getItem("user_id")
      const [active, setActive] = useState("")

  const handleLogout = () => {
    dispatch(Logout());
    axios
      .put(`http://localhost:5000/users/isNotlogin/false/${userId}`, {})
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChosen=(e)=>{
    setActive(e.target.innerText)
  }
  return (
    <div className="adminSide">
      <Link to={"/Admin/Panel"} className={active=="Dashboard"?"active":"NotActive"} onClick={handleChosen}>Dashboard</Link>
      <br></br>
      <Link to={"./users"} className={active=="Users"?"active":"NotActive"} onClick={handleChosen}>Users</Link>
      <br></br>
      <Link to={"./posts"} className={active=="Posts"?"active":"NotActive"} onClick={handleChosen}>Posts</Link>
      <br></br>
      <Link to={"./Is/Login"}  className={active=="Online users"?"active":"NotActive"} onClick={handleChosen}>Online users </Link>
      <br></br>
      <Link to={"./reports"} className={active=="Reports"?"active":"NotActive"} onClick={handleChosen}>Reports</Link>
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

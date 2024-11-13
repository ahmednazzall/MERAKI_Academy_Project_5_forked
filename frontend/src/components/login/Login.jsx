import React, { useState } from "react";
import "./login.css";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login,SetUserId } from "../redux/reducers/auth"; 
import axios from "axios";

const Login = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [userInfo, setUserInfo] = useState({});
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    axios
      .post("http://localhost:5000/users/login", userInfo)
      .then((res) => {
        dispatch(login(res.data.token))
        dispatch(SetUserId(res.data.userId))
        setMessage(res.data.message)
        navigate("/home")
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message)
      });
  };
  const isLoggedIn=useSelector(auth=>{
    return auth.auth.isLoggedIn
  })
  
  return (
    <div>
      <br></br>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        onChange={(e) => {
          setUserInfo({ ...userInfo, email: e.target.value });
        }}
      />
      <br></br>
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        onChange={(e) => {
          setUserInfo({ ...userInfo, password: e.target.value });
        }}
      />
      <br></br>
      <button onClick={handleLogin}>login</button>
      {isLoggedIn
        ? message && <p className="success">{message}</p>
        : message && <p className="failed">{message}</p>}
    </div>
  );
};

export default Login;

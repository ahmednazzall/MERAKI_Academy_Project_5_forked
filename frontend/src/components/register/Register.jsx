import React, { useState } from "react";
import "./register.css";
import axios from "axios"
import { register } from "../redux/reducers/sliceUser";
import {useDispatch} from "react-redux"
const Register = () => {
  const [userInfo, setUserInfo] = useState({});
  const handleRegister = () => {
    axios
      .post("http://localhost:5000/users/register", userInfo)
      .then((result) => {
        // console.log(result.data.result);
        useDispatch(register(result.data.result))
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <input
        type="text"
        name="firstName"
        placeholder="insert your first name"
        onChange={(e) => {
          setUserInfo({ ...userInfo, firstName: e.target.value });
        }}
      />
      <br></br>
      <input
        type="text"
        name="lastName"
        placeholder="insert your last name "
        onChange={(e) => {
          setUserInfo({ ...userInfo, lastName: e.target.value });
        }}
      />
      <br></br>
      <input
        type="text"
        name="userName"
        placeholder="insert your user name"
        onChange={(e) => {
          setUserInfo({ ...userInfo, userName: e.target.value });
        }}
      />
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
      <input
        type="date"
        name="dateOfBirth"
        onChange={(e) => {
          setUserInfo({ ...userInfo, dateOfBirth: e.target.value });
        }}
      />
      <br></br>
      <input
        type="text"
        name="country"
        placeholder="choose your country"
        onChange={(e) => {
          setUserInfo({ ...userInfo, country: e.target.value });
        }}
      />
      <br></br>
      <button onClick={handleRegister}>submit</button>
    </div>
  );
};

export default Register;

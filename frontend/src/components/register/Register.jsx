import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { register } from "../redux/reducers/sliceUser";
import { useDispatch } from "react-redux";
const Register = () => {
  const [userInfo, setUserInfo] = useState({});
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const handleRegister = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/users/register", userInfo)
      .then((result) => {
        // console.log(result.data.result);
        dispatch(register(result.data.result));
        setStatus(true);
        setMessage(result?.data.message);
      })
      .catch((err) => {
        console.log(err);
        
        setStatus(false);
        setMessage(err.response.data.message);
      });
  };

  return (
    <div>
      <input
        type="text"
        name="firstName"
        placeholder="insert your first name"
        onChange={(e) => {
          setUserInfo({ ...userInfo, first_name: e.target.value });
        }}
      />
      <br></br>
      <input
        type="text"
        name="lastName"
        placeholder="insert your last name "
        onChange={(e) => {
          setUserInfo({ ...userInfo, last_name: e.target.value });
        }}
      />
      <br></br>
      <input
        type="text"
        name="userName"
        placeholder="insert your user name"
        onChange={(e) => {
          setUserInfo({ ...userInfo, user_name: e.target.value });
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
          setUserInfo({ ...userInfo, birth_date: e.target.value });
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

      <p>
        Already have an account? <a href="/">login</a>{" "}
      </p>
      <br></br>
      <button onClick={handleRegister}>Sign Up</button>
      <br></br>

      <p>Or by</p>
      <a href="#">Google link</a>
      {status
        ? message && <p className="success">{message}</p>
        : message && <p className="failed">{message}</p>}
    </div>
  );
};

export default Register;

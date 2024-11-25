import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { register } from "../redux/reducers/sliceUser";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
const Register = () => {
  const [userInfo, setUserInfo] = useState({ gender: "male" });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/users/register", userInfo)
      .then((result) => {
        // console.log(result.data.result);
        dispatch(register(result.data.result));
        setStatus(true);
        setMessage(`${result?.data.message} transferring to login page... `);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((err) => {
        console.log(err);

        setStatus(false);
        setMessage(err.response.data.message);
      });
  };

  return (
    <div className="Body-Login">
    <div className="frame">
<div className="plane-container">

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="1131.53px" height="379.304px" viewBox="0 0 1131.53 379.304" enable-background="new 0 0 1131.53 379.304"
xml:space="preserve" className="plane">
<polygon fill="#D8D8D8" points="72.008,0 274.113,140.173 274.113,301.804 390.796,221.102 601.682,367.302 1131.53,0.223  "/>
<polygon fill="#C4C4C3" points="1131.53,0.223 274.113,140.173 274.113,301.804 390.796,221.102   "/>
</svg>

</div>
</div>
<div className="clouds">

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="762px"
height="331px" viewBox="0 0 762 331" enable-background="new 0 0 762 331" xml:space="preserve" className="cloud big front slowest">
<path fill="#FFFFFF" d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"/>
</svg>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="762px"
height="331px" viewBox="0 0 762 331" enable-background="new 0 0 762 331" xml:space="preserve" className="cloud distant smaller">
<path fill="#FFFFFF" d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"/>
</svg>

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="762px"
height="331px" viewBox="0 0 762 331" enable-background="new 0 0 762 331" xml:space="preserve" className="cloud small slow">
<path fill="#FFFFFF" d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"/>
</svg>

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="762px"
height="331px" viewBox="0 0 762 331" enable-background="new 0 0 762 331" xml:space="preserve" className="cloud distant super-slow massive">
<path fill="#FFFFFF" d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"/>
</svg>

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="762px"
height="331px" viewBox="0 0 762 331" enable-background="new 0 0 762 331" xml:space="preserve" className="cloud slower">
<path fill="#FFFFFF" d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"/>
</svg>

</div>
    <div className="Register-Page">
    <div className="Register-Form">
      <div className="Register-Inputs">
      <input
      className="FirstName-Input"
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
        className="LastName-Input"
        onChange={(e) => {
          setUserInfo({ ...userInfo, last_name: e.target.value });
        }}
      />
      <br></br>
      <input
        type="text"
        name="userName"
        placeholder="insert your user name"
        className="UserName-Input"
        onChange={(e) => {
          setUserInfo({ ...userInfo, user_name: e.target.value });
        }}
      />
      <br></br>
      <input
        type="date"
        name="dateOfBirth"
        className="Birth-Input"
        onChange={(e) => {
          setUserInfo({ ...userInfo, birth_date: e.target.value });
        }}
      />
      <br></br>
      <select
        name="gender"
        id="gender"
        className="Gender-Input"
        onChange={(e) => {
          setUserInfo({ ...userInfo, gender: e.target.value });
        }}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <br></br>
      <input
        type="text"
        name="country"
        placeholder="choose your country"
        className="Country-Input"
        onChange={(e) => {
          setUserInfo({ ...userInfo, country: e.target.value });
        }}
      />
      <br></br>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="Email-Input-R"
          onChange={(e) => {
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
        />
        <br></br>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="Password-Input-R"
          onChange={(e) => {
            setUserInfo({ ...userInfo, password: e.target.value });
          }}
        />
        <br></br>
      </div>
      <p className="Have-Account">
        Already have an account? <a href="/">login</a>{" "}
      </p>
      <br></br>
      <button onClick={handleRegister} className="Register-Button">Sign Up</button>
      <br></br>

      <p className="OR-R">Or</p>
      <div className="google-R">
      <GoogleLogin 
  onSuccess={credentialResponse => {
    const decode = jwtDecode(credentialResponse.credential)
    const data = {user_name : decode.given_name,first_name:decode.given_name , last_name:decode.family_name,email:decode.email,password:decode.sub,image:decode.picture,
    }
    axios
    .post("http://localhost:5000/users/register", data)
    .then((result) => {
      // console.log(result.data.result);
      dispatch(register(result.data.result));
      setStatus(true);
      setMessage(`${result?.data.message} transferring to login page... `);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    })
    .catch((err) => {
      console.log(err);

      setStatus(false);
      setMessage(err.response.data.message);
    });
    console.log(decode)
  }}
  onError={() => {
    console.log('Login Failed')
  }}
  useOneTap
/>
     </div>
      {status
        ? message && <p className="success">{message}</p>
        : message && <p className="failed">{message}</p>}
        </div>
         <div className="Welcome-Div">
        <h4 className="Welcome-Login-R">Welcome to</h4>
       <img src="../../Preview.png" className="Moltaqa-Logo-R"/>
       <p className="Description-Login-R">In This Application You Can Contact With Any Person Using This App And Talk About Your Opinions By Creating Posts Or Comments , Also You Can Follow Any User And See His Activities ,
        Thank You For Choosing Us .
       </p>
       </div>
    </div>
    </div>
  );
};

export default Register;

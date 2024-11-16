import React, { useState } from "react";
import "./style.css";
import { Outlet, useNavigate } from "react-router-dom";
const Forget = () => {
  const [showNext, setShowNext] = useState(localStorage.getItem("next"));
  const navigate = useNavigate();
  const [email, setEmail] = useState({})
  return (
    <div className="form-popup" id="myForm">
      {!showNext && (
        <form
          className="form-container"
          onSubmit={() => {
            localStorage.setItem("next",true)
            setShowNext(true);
            navigate(`./claim/?email=${email}`);
          }}
        >
          <label htmlFor="email">
            <b> Enter your email</b>
          </label>
          <input
            type="text"
            placeholder="Insert your email"
            name="email"
            onChange={(e)=>{setEmail(e.target.value)}}
            required
          />

          <button type="submit" className="btn">
            next
          </button>
          <button
            type="button"
            className="btn cancel"
            onClick={() => {
              localStorage.removeItem("next")
              navigate("/");
            }}
          >
            Close
          </button>
        </form>
      )}

      <Outlet />
    </div>
  );
};

export default Forget;

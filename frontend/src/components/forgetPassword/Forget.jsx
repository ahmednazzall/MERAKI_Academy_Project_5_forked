import React from "react";
import "./style.css";
const Forget = () => {
  return (
    <div className="form-popup" id="myForm">
      <form className="form-container">
        <label htmlFor="email">
          <b> enter your Email</b>
        </label>
        <input type="text" placeholder="Enter Email" name="email" required />

        <button type="submit" className="btn">
          next
        </button>
        <button type="button" className="btn cancel">
          Close
        </button>
      </form>
    </div>
  );
};

export default Forget;

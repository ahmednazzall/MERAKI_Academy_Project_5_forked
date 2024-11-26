import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaSearch,
  FaHome,
  FaCalendarAlt,
  FaBookmark,
  FaCog,
  FaLock,
  FaPhoneAlt,
} from "react-icons/fa";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import "./sideStyle.css";
import { Logout } from "../redux/reducers/auth";
import { useDispatch } from "react-redux";
import axios from "axios";

const Side = () => {
  const userId = localStorage.getItem("user_id");
  const dispatch = useDispatch();
  const [showSettings, setShowSettings] = useState(false); 

  const handleLogout = () => {
    dispatch(Logout());
    axios
      .put(`http://localhost:5000/users/isNotlogin/false/${userId}`, {})
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleSettings = () => {
    setShowSettings((prevState) => !prevState); 
  };

  return (
    <div className="sidebar1">
      {/* Profile Link */}
      <Link
        to={`/home/profile/${userId}`}
        onClick={() => {
          if (localStorage.getItem("postId")) {
            localStorage.removeItem("postId");
          }
        }}
      >
        <FaUser className="sidebar-icon" /> Profile
      </Link>

      {/* Explore Link */}
      <Link to={"/home/explore"}>
        <FaSearch className="sidebar-icon" /> Explore
      </Link>

      {/* Feeds Link */}
      <Link
        to={"/home/"}
        onClick={() => {
          if (localStorage.getItem("postId")) {
            localStorage.removeItem("postId");
          }
        }}
      >
        <FaHome className="sidebar-icon" /> Feeds
      </Link>

        <Link
         to={"/chat/"}
         >
        <HiMiniChatBubbleLeftRight className="sidebar-icon"></HiMiniChatBubbleLeftRight>Chatting
        </Link>
      {/* Events Link */}
      <Link
        to={"/home/events"}
        onClick={() => {
          if (localStorage.getItem("eventId")) {
            localStorage.removeItem("eventId");
          }
        }}
      >
        <FaCalendarAlt className="sidebar-icon" /> Events
      </Link>

      <Link to={"./bookmark"}>
        <FaBookmark className="sidebar-icon" /> Bookmarks
      </Link>

      {/* Settings Section */}
      <div className="settings">
        <button className="settingsToggle" onClick={toggleSettings}>
          <FaCog className="sidebar-icon" /> Settings
        </button>

        {/* Settings Menu (Dropdown) */}
        {showSettings && (
          <div className="settingsMenu">
            <Link to={"/home/setting/howToUse"}>
              <FaLock className="sidebar-icon" /> How To Use Our Website
            </Link>
            <Link to={"/home/setting/general"}>
              <FaCog className="sidebar-icon" /> General Settings
            </Link>
            <Link to={"/home/setting/privacy"}>
              <FaLock className="sidebar-icon" /> Privacy Settings
            </Link>
            <Link to={"/home/setting/security"}>
              <FaLock className="sidebar-icon" /> Security Settings
            </Link>
            <Link to={"/home/setting/contact"}>
              <FaPhoneAlt className="sidebar-icon" /> Contact Us
            </Link>
          </div>
        )}
      </div>

      <Link to="#" onClick={handleLogout} className="LogoutLink">
        <FaLock className="sidebar1-icon" /> Logout
      </Link>
    </div>
  );
};

export default Side;

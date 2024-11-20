import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sideStyle.css";
import { Logout } from "../redux/reducers/auth";
import { useDispatch } from "react-redux";

const Side = () => {
  const dispatch = useDispatch();
  const user_id = localStorage.getItem("user_id");
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = () => {
    dispatch(Logout());
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="sidebar">
      {/* Profile Link */}
      <Link
        to={`/home/profile/${user_id}`}
        onClick={() => {
          if (localStorage.getItem("postId")) {
            localStorage.removeItem("postId");
          }
        }}
      >
        Profile
      </Link>
      <br />

      {/* Explore Link */}
      <Link to={"/home/explore"}>Explore</Link>
      <br />

      {/* Feeds Link */}
      <Link
        to={"/home/"}
        onClick={() => {
          if (localStorage.getItem("postId")) {
            localStorage.removeItem("postId");
          }
        }}
      >
        Feeds
      </Link>
      <br />

      {/* Events Link */}
      <Link
        to={"/home/events"}
        onClick={() => {
          if (localStorage.getItem("eventId")) {
            localStorage.removeItem("eventId");
          }
        }}
      >
        Events
      </Link>
      <br />

      {/* Bookmarks Link */}
      <Link to={"/home/bookmark"}>Bookmarks</Link>
      <br />

      {/* Settings Section */}
      <div className="settings">
        <button onClick={toggleSettings} className="settingsToggle">
          Settings
        </button>
        {showSettings && (
          <div className="settingsMenu">
            <Link to={"/home/settings/general"}>General Settings</Link>
            <br />
            <Link to={"/home/settings/privacy"}>Privacy Settings</Link>
            <br />
            <Link to={"/home/settings/security"}>Security Settings</Link>
            <br />
            <Link to={"/home/settings/contact"}>Contact Us</Link>
            <br />
            <button onClick={handleLogout} className="LogoutButton">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Side;

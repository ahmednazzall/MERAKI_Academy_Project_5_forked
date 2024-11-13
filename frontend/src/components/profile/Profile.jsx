import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ProfilePage.css";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="profile-container">
      <div className="sidebar">Sidebar</div>
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-picture">
            <img
              src={user.profilePicture || "default-profile.png"}
              alt="Profile"
            />
          </div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p>@{user.userName}</p>
          </div>
          <button className="edit-profile-button">Edit Profile</button>
        </div>

        <div className="bio-section">{user.bio}</div>

        <div className="details-section">
          <div className="detail-item">Location: {user.location}</div>
          <div className="detail-item">Joined: {user.createdAt}</div>
          <div className="detail-item">Followers: {user.followers}</div>
          <div className="detail-item">Following: {user.following}</div>
        </div>

        <div className="posts-section">
          <h3>User Posts</h3>
          <div className="posts-list">
            {user.posts.map((post, index) => (
              <div key={index} className="post-item">
                {post}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

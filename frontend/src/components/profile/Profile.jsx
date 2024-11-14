import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Profile.css";
import axios from "axios";
import { getUserById } from "../redux/reducers/sliceUser";
const ProfilePage = () => {
  const userId = localStorage.getItem("user_id");

  const dispatch = useDispatch();
  const token=useSelector((state=>{
    return state.auth.token
  }))
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${userId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      .then((result) => {
        console.log(result);
        dispatch(getUserById(result.data.User));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const user = useSelector((state) => {
    return state.users.users;
  });
  
  return (
    <div className="profile-container">
      <div className="sidebar">Sidebar</div>
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-picture">
            <img
              src={user?.profile_image || "default-profile.png"}
              alt="Profile"
            />
          </div>
          <div className="profile-info">
            <h2>{user?.first_name}</h2>
            <p>@{user?.user_name}</p>
          </div>
          <button className="edit-profile-button">Edit Profile</button>
        </div>

        <div className="bio-section">{user?.bio}</div>

        <div className="details-section">
          <div className="detail-item">Location: {user?.country}</div>
          <div className="detail-item">Joined: {user?.created_at}</div>
          <div className="detail-item">Followers: {user?.followers || 0}</div>
          <div className="detail-item">Following: {user?.following || 0}</div>
        </div>

        <div className="posts-section">
          <h3>User Posts</h3>
          {/*      <div className="posts-list">
            {user?.posts.map((post, index) => (
              <div key={index} className="post-item">
                {post}
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Profile.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../redux/reducers/sliceUser";

const ProfilePage = () => {
  const {id}=useParams()
  
  const userId = id
  
  const [following, setFollowing] = useState();
  const [follower, setFollower] = useState();
  // const [user, setUser] = useState();
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    return state.auth.token;
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        // console.log(result);
        // setUser(result.data.User);
        dispatch(getUserById(result.data.User));
      })
      .catch((err) => {
        console.log(err);
      });


      axios
      .get(`http://localhost:5000/followers/posty`, {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        
      })
      .catch(err=>{
        console.log(err);
        
      })

  }, []);

  const user = useSelector((state) => {
    return state.users.users;
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/followers/${userId}/following`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        // console.log(result);
        setFollowing(result.data.data?.length);
        
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(userId);

    axios
      .get(`http://localhost:5000/followers/${userId}/follower`)
      .then((result) => {
        setFollower(result.data.data?.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  // console.log(user.user_id);

  return (
    <div className="profile-container">
      <div className="sidebar">Sidebar</div>
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-picture">
            <img
              src={user[0]?.profile_image || "default-profile.png"}
              alt="Profile"
            />
          </div>
          <div className="profile-info">
            <h2>{user[0]?.first_name}</h2>
            <p>@{user[0]?.user_name}</p>
          </div>
          <button className="edit-profile-button">Edit Profile</button>
        </div>

        <div className="bio-section">{user?.bio}</div>

        <div className="details-section">
          <div className="detail-item">Location: {user[0]?.country}</div>
          <div className="detail-item">Joined: {user[0]?.created_at}</div>

          {follower ? (
            <div className="detail-item">
              Followers:
              <Link to={`/home/profile/f/${0}`}>{follower}</Link>
            </div>
          ) : (
            <div className="detail-item">Followers:0</div>
          )}

          {following ? (
            <div className="detail-item">
              Following:
              <Link to={`/home/profile/f/${1}`}>{following}</Link>
            </div>
          ) : (
            <div className="detail-item">Following:0</div>
          )}
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

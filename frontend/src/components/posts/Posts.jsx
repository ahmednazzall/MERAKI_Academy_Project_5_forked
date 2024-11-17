import React, { useEffect, useState } from "react";
import "./posts.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPosts } from "../redux/reducers/slicePosts";

const Posts = () => {
  const [addPost, setAddPost] = useState({});
  const postInfo = {
    image: addPost.image || null,
    body: addPost.body || null,
    video: addPost.video || null,
  };
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const posts = useSelector((posts) => {
    return posts.posts.posts;
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setPosts(res.data.Posts));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, token]);

  const handleAddSave = (id) => {
    axios
      .post(
        `http://localhost:5000/posts/add&save/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* Search Section */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              navigate("./search");
            }
          }}
        />
        <button className="search-button" onClick={() => navigate("./search")}>
          Search
        </button>
      </div>

      {/* Create Post Section */}
      <div className="createPost">
        <input
          placeholder="What's on your mind?"
          onChange={(e) => setAddPost({ ...addPost, body: e.target.value })}
          className="post-input"
        />
        <button
          type="submit"
          onClick={() => {
            axios
              .post("http://localhost:5000/posts", postInfo, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                console.log("Post Created Successfully");
              })
              .catch((err) => {
                console.log("Error creating post:", err);
              });
          }}
          className="post-button"
        >
          Post
        </button>
      </div>

      {/* Posts Display Section */}
      {posts?.map((elem, ind) => {
        return (
          <div key={ind} className="post">
            {/* Just for test */}
            {elem.profile_image ? (
              <img src={elem.profile_image} alt="Profile" className="profPic" />
            ) : null}
            <div className="innerPost">
              <h3>{elem.user_name}</h3>
              <p>{elem.body}</p>
              <div className="btn-container">
                <button
                  className="btn"
                  onClick={() => {
                    handleAddSave(elem.post_id);
                  }}
                >
                  Save Post
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    localStorage.setItem("postId", elem.post_id);
                    navigate("./comments");
                  }}
                >
                  Comments
                </button>
                <button className="btn">Like</button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating Help Button (Custom Implementation) */}
      <div className="float-button" onClick={() => alert("Help Clicked!")}>
        <span className="float-button-icon">?</span>
      </div>
    </div>
  );
};

export default Posts;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SavedPost = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => {
    return state.auth.token;
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts/saved", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setPosts(result.data.saved_posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (id) => {
    navigate(`/home/comments/${id}`);
  };

  const handleRemove = (id) => {
    axios
      .delete(`http://localhost:5000/posts/savedTr/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res);
        const removed = posts.filter((post) => {
          return post.post_id !== id;
        });
        setPosts(removed);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Saved Posts</h2>
      {posts.length ? (
        posts.map((post) => {
          return (
            <div key={post.saved_post_id}>
              <button
                onClick={() => {
                  handleRemove(post.post_id);
                }}
              >
                remove from bookmark
              </button>
              <div
                onClick={() => {
                  handleClick(post.post_id);
                }}
              >
                <img src={post?.profile_image} />@{post.user_name}
                <div>
                  <br></br>
                  {post.body}
                </div>
                <p>saved at {post.saved_at}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p>No saved posts</p>
      )}
    </div>
  );
};
export default SavedPost;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SavedPost = () => {
  const [posts, setPosts] = useState([]);
  const filteredPosts = [];
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

  posts?.map((elem) => {
    if (filteredPosts.length) {
      filteredPosts.map((e) => {
        if (elem.post_id !== e.post_id) {
          filteredPosts.push(elem);
        }
      });
    } else {
      filteredPosts.push(elem);
    }
  });

  const handleClick = (id) => {
    navigate(`/home/comments/${id}`);
  };

  return (
    <div>
      <h2>Saved Posts</h2>
      {filteredPosts.length ? (
        filteredPosts.map((post) => {
          return (
            <div
              key={post.saved_post_id}
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
              <button>remove from bookmark</button>
            </div>
          );
        })
      ) : (
        <p>no saved posts</p>
      )}
    </div>
  );
};

export default SavedPost;

import React, { useEffect } from "react";
import "./posts.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/reducers/slicePosts";
const Posts = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const posts = useSelector((posts) => {
    return posts.posts.posts;
  });
  // console.log(posts);

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
  }, [posts]);
  return (
    <div>
      {posts?.map((elem, ind) => {
        return (
          <div key={ind}>
            {/* just for test */}
            {elem.profile_image ? <img src={elem.profile_image} /> : null}
            <h3>{elem.user_name}</h3>
            <p>{elem.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;

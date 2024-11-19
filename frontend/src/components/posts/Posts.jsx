import React, { useEffect, useState } from "react";
import "./posts.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createPost, deletePost, setPosts } from "../redux/reducers/slicePosts";
import { useNavigate, useParams } from "react-router-dom";
import Search from "../search/Search";
import Like from "../likes/Like";

import { Input, Button, FloatButton, Avatar } from "antd";
import { QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";
const Posts = () => {
  const [postId, setpostId] = useState(0);
  const [updateClicked, setupdateClicked] = useState(false);
  const [editPosttext, seteditPosttext] = useState("");
  const [addPost, setAddPost] = useState({});
  const postInfo = {
    image: addPost.image || null,
    body: addPost.body || null,
    video: addPost.video || null,
  };
  const { id } = useParams();
  const userId = id ? id : localStorage.getItem("user_id");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [savedPost, setSavedPost] = useState([]);
  
  const posts = useSelector((state) => state.posts.posts);
  // console.log(posts);

  // Fetch posts on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:5000/followers/posty/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setPosts(res.data.data));

        // console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [posts]);

  //fetch saved posts

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts/saved", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        let found = result.data.saved_posts.map((elem) => {
          return elem.post_id;
        });
        setSavedPost(found);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [posts]);

  // Handle save post
  const handleAddSave = (id) => {
    if (!savedPost.includes(id)) {
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
          return console.log("Post saved successfully!");
        })
        .catch((err) => {
          return console.error(err);
        });
    } else {
      return console.log("already saved");
    }
  };

  // Handle adding a new post
  const handleAddPost = () => {
    axios
      .post("http://localhost:5000/posts", postInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        navigate("/loading");
        setTimeout(() => {
          navigate("./");
        }, 1);

        setAddPost({}); // Reset the input fields
      })
      .catch((err) => {
        console.error(err);
        console.log('"Failed to create post."');
      });
  };
  const handelUpdatePost = (postId) => {
    axios
      .put(
        `http://localhost:5000/posts/${postId}`,
        {
          body: editPosttext,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {})
      .catch((err) => {
        console.error(err);
        console.log('"Failed to create post."');
      });
  };
  const handelDelete = (postId) => {
    axios
      .delete(`http://localhost:5000/posts/${postId}/soft`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(deletePost({ post_id: postId }));
      })
      .catch((err) => {
        console.error(err);
        console.log('"Failed to create post."');
      });
  };
  return (
    <div>
      {/* Search Section */}

      {/* Create Post Section */}
      <div className="createPost">
        <Input.TextArea
          placeholder="What's on your mind?"
          value={addPost.body || ""}
          onChange={(e) => setAddPost({ ...addPost, body: e.target.value })}
          rows={3}
          className="create-post-input"
        />
        <Button type="primary" onClick={handleAddPost}>
          Post
        </Button>
      </div>

      {/* Display Posts */}
      <div className="posts-section">
        {posts?.map((post, index) => (
          <div key={index} className="post">
            {post.profile_image ? (
              <Avatar
                src={post.profile_image}
                className="post-avatar"
                onClick={() => {
                  navigate(`./profile/${post.user_id}`);
                }}
              />
            ) : (
              <Avatar icon={<UserOutlined />} className="post-avatar" />
            )}
            <div className="post-content">
              <h3>{post.user_name}</h3>
              <p>{post.body}</p>
              {post.user_id == userId ? (
                <div className="UD-Post">
                  {!updateClicked ? (
                    <Button
                      onClick={(e) => {
                        setupdateClicked(true);
                        setpostId(post.post_id);
                      }}
                    >
                      Update
                    </Button>
                  ) : null}

                  {updateClicked && postId == post.post_id ? (
                    <>
                      <Input
                        onChange={(e) => {
                          seteditPosttext(e.target.value);
                        }}
                      />

                      <Button
                        onClick={(e) => {
                          handelUpdatePost(post.post_id);
                          setupdateClicked(false);
                        }}
                      >
                        Save
                      </Button>
                    </>
                  ) : null}
                  <Button
                    onClick={(e) => {
                      handelDelete(post.post_id);
                    }}
                  >
                    DELETE
                  </Button>
                </div>
              ) : null}
              <div className="post-actions">
                {!savedPost.includes(post.post_id) ? (
                  <Button
                    type="link"
                    onClick={() => {
                      handleAddSave(post.post_id);
                    }}
                  >
                    Save Post
                  </Button>
                ) : (
                  <Button danger type="text" disabled>
                    Saved
                  </Button>
                )}

                <Button
                  type="link"
                  onClick={() => {
                    localStorage.setItem("postId", post.post_id);

                    navigate(`/home/comments/${post.post_id}`);
                  }}
                >
                  Comments
                </Button>

                <Like postId={post.post_id} />

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Help Button */}
      <FloatButton
        className="float-button"
        icon={<QuestionCircleOutlined />}
        type="primary"
      />
    </div>
  );
};

export default Posts;

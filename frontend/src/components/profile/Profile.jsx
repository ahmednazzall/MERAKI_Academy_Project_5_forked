import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Profile.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../redux/reducers/sliceUser";
import { createPost, deletePost, setPosts, updatePost } from "../redux/reducers/slicePosts";
import { Input, Button, FloatButton, Avatar } from "antd";
const ProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateClicked, setUpdateClicked] = useState(false);
  const [postId, setPostId] = useState(0);
  const [editPostText, setEditPostText] = useState("");
  const [savedPost, setSavedPost] = useState([]);
  const userId = id ? id : localStorage.getItem("user_id");

  // const userId = id;
  const [addPost, setAddPost] = useState({});
  const postInfo = {
    image: addPost.image || null,
    body: addPost.body || null,
    video: addPost.video || null,
  };
  const [following, setFollowing] = useState();
  const [follower, setFollower] = useState();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    return state.auth.token;
  });

  const user = useSelector((state) => {
    return state.users.users;
  });
  const posts = useSelector((state) => {
    return state.posts.posts;
  });

  // getting user and his post
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(getUserById(result.data.User));
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:5000/posts/${userId}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setPosts(result.data.Post));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [posts]);

  // fetching following and followers
  useEffect(() => {
    axios
      .get(`http://localhost:5000/followers/${id}/following`, {
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
      .get(`http://localhost:5000/followers/${id}/follower`)
      .then((result) => {
        setFollower(result.data.data?.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

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

  const handleAddPost = () => {
    axios
      .post("http://localhost:5000/posts", postInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(createPost(res.data.post[0]))
      
        setAddPost({}); // Reset the input fields
      })
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
  const handelUpdatePost = (postId) => {
    axios
      .put(
        `http://localhost:5000/posts/${postId}`,
        {
          body: editPostText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.UpdatedPost);
        // updatePost
        dispatch(updatePost(res.data.UpdatedPost[0]));
      })
      .catch((err) => {
        console.error(err);
        console.log('"Failed to create post."');
      });
  };
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
          {user[0]?.user_id == localStorage.getItem("user_id") && (
            <button
              className="edit-profile-button"
              onClick={() => {
                navigate(`/home/profile/edit`);
              }}
            >
              Edit Profile
            </button>
          )}
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

          <div className="posts-section">
          <div className="createPost">
                  <Input.TextArea
                    placeholder="What's on your mind?"
                    value={addPost.body || ""}
                    onChange={(e) =>
                      setAddPost({ ...addPost, body: e.target.value })
                    }
                    rows={3}
                    className="create-post-input"
                  />
                  <Button type="primary" onClick={handleAddPost}>
                    Post
                  </Button>
                </div>
            {posts?.map((post, index) => (
            (  <div key={index} className="post">
                <Avatar
                  src={post?.profile_image}
                  className="post-avatar"
                  onClick={() => {
                    navigate(`/home/profile/${post.user_id}`);
                  }}
                />

                <div className="post-content">
                  <h3>{post?.user_name}</h3>
                  <p>{post?.body}</p>
                  {post?.user_id == userId ? (
                    <div className="UD-Post">
                      {!updateClicked && (
                        <Button
                          onClick={(e) => {
                            setUpdateClicked(true);
                            setPostId(post.post_id);
                          }}
                        >
                          Update
                        </Button>
                      )}

                      {updateClicked && postId == post?.post_id ? (
                        <>
                          <Input
                            onChange={(e) => {
                              setEditPostText(e.target.value);
                            }}
                          />

                          <Button
                            onClick={(e) => {
                              handelUpdatePost(post.post_id);
                              setUpdateClicked(false);
                            }}
                          >
                            Save
                          </Button>
                          <Button
                            onClick={(e) => {
                              setUpdateClicked(false);
                            }}
                          >
                            Cancel
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
                    {!savedPost.includes(post?.post_id) ? (
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
                        localStorage.setItem("postId", post?.post_id);

                        navigate(`/home/comments/${post?.post_id}`);
                      }}
                    >
                      Comments
                    </Button>
                    <Button type="link">Like</Button>
                  </div>
                </div>
              </div>)
            ))}
          </div>

          {/* <Posts/> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

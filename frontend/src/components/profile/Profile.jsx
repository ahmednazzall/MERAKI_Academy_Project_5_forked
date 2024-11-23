import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Profile.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../redux/reducers/sliceUser";
import {
  createPost,
  deletePost,
  setPosts,
  updatePost,
} from "../redux/reducers/slicePosts";
import { Input, Button, Card, Avatar, Typography, Row, Col, Space } from "antd";

const { Title, Paragraph } = Typography;

const ProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateClicked, setUpdateClicked] = useState(false);
  const [postId, setPostId] = useState(0);
  const [editPostText, setEditPostText] = useState("");
  const [savedPost, setSavedPost] = useState([]);
  const userId = id ? id : localStorage.getItem("user_id");

  const [addPost, setAddPost] = useState({});
  const postInfo = {
    image: addPost.image || null,
    body: addPost.body || null,
    video: addPost.video || null,
  };

  const [following, setFollowing] = useState();
  const [follower, setFollower] = useState();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.users.users);
  const posts = useSelector((state) => state.posts.posts);

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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/followers/${id}/following`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setFollowing(result.data.data?.length);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:5000/followers/${id}/follower`)
      .then((result) => {
        setFollower(result.data.data?.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

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
        dispatch(createPost(res.data.post[0]));
        setAddPost({});
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
        dispatch(updatePost(res.data.UpdatedPost[0]));
      })
      .catch((err) => {
        console.error(err);
        console.log('"Failed to create post."');
      });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture">
          <Avatar
            size={120}
            src={user[0]?.profile_image || "default-profile.png"}
          />
        </div>
        <div className="profile-info">
          <Title level={2}>{user[0]?.first_name}</Title>
          <p>@{user[0]?.user_name}</p>
        </div>
        {user[0]?.user_id === localStorage.getItem("user_id") && (
          <Button type="primary" onClick={() => navigate(`/home/profile/edit`)}>
            Edit Profile
          </Button>
        )}
      </div>

      <Paragraph>{user?.bio}</Paragraph>

      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <p>Location: {user[0]?.country}</p>
            <p>Joined: {user[0]?.created_at}</p>
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <p>Followers: {follower || 0}</p>
            <p>Following: {following || 0}</p>
          </Card>
        </Col>
      </Row>

      <div className="createPost">
        <Input.TextArea
          placeholder="What's on your mind?"
          value={addPost.body || ""}
          onChange={(e) => setAddPost({ ...addPost, body: e.target.value })}
          rows={3}
        />
        <Button type="primary" onClick={handleAddPost}>
          Post
        </Button>
      </div>

      <div className="posts-section">
        <h3>User Posts</h3>
        {posts?.map((post, index) => (
          <Card key={index} style={{ marginBottom: "20px" }}>
            <Space direction="vertical" size="large">
              <Row>
                <Col span={4}>
                  <Avatar size="large" src={post?.profile_image} />
                </Col>
                <Col span={20}>
                  <h3>{post?.user_name}</h3>
                  <p>{post?.body}</p>
                  {post?.user_id === userId && (
                    <div className="post-actions">
                      {!updateClicked && (
                        <Button
                          onClick={() => {
                            setUpdateClicked(true);
                            setPostId(post.post_id);
                          }}
                        >
                          Update
                        </Button>
                      )}
                      {updateClicked && postId === post?.post_id && (
                        <>
                          <Input
                            value={editPostText}
                            onChange={(e) => setEditPostText(e.target.value)}
                          />
                          <Button
                            onClick={() => {
                              handelUpdatePost(post.post_id);
                              setUpdateClicked(false);
                            }}
                          >
                            Save
                          </Button>
                          <Button onClick={() => setUpdateClicked(false)}>
                            Cancel
                          </Button>
                        </>
                      )}
                      <Button onClick={() => handelDelete(post.post_id)}>
                        Delete
                      </Button>
                    </div>
                  )}
                </Col>
              </Row>

              <div className="post-actions">
                {!savedPost.includes(post?.post_id) ? (
                  <Button
                    type="link"
                    onClick={() => handleAddSave(post.post_id)}
                  >
                    Save Post
                  </Button>
                ) : (
                  <Button type="text" disabled>
                    Saved
                  </Button>
                )}
                <Button
                  type="link"
                  onClick={() => navigate(`/home/comments/${post?.post_id}`)}
                >
                  Comments
                </Button>
                <Button type="link">Like</Button>
              </div>
            </Space>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;

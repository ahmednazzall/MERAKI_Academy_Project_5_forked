import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../redux/reducers/sliceUser";
import {
  createPost,
  deletePost,
  setPosts,
  updatePost,
} from "../redux/reducers/slicePosts";
import {
  Input,
  Button,
  Card,
  Avatar,
  Typography,
  Row,
  Col,
  Space,
  Upload,
  Tooltip,
} from "antd";
import {
  HeartFilled,
  MessageOutlined,
  SaveOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  UsergroupAddOutlined,
  CameraOutlined,
  SendOutlined,

} from "@ant-design/icons";
import "./Profile.css";
import Like from "../likes/Like";


const { Title, Paragraph } = Typography;

const ProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateClicked, setUpdateClicked] = useState(false);
  const [postId, setPostId] = useState(0);
  const [editPostText, setEditPostText] = useState("");
  const [savedPost, setSavedPost] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
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
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(getUserById(result.data.User));
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:5000/posts/${userId}/user`, {
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
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

  const handleFileUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    if (isImage) {
      setAddPost({ ...addPost, image: file });
      message.success("Image added successfully!");
    } else if (isVideo) {
      setAddPost({ ...addPost, video: file });
      message.success("Video added successfully!");
    } else {
      message.error("Only images and videos are allowed!");
    }
    return false;
  };

  const handelDelete = (postId) => {
    axios
      .delete(`http://localhost:5000/posts/${postId}/soft`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(deletePost({ post_id: postId }));
      })
      .catch((err) => {
        console.error(err);
        console.log('"Failed to delete post."');
      });
  };

  const handleAddSave = (id) => {
    if (!savedPost.includes(id)) {
      axios
        .post(
          `http://localhost:5000/posts/add&save/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log("Post saved successfully!");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log("already saved");
    }
  };

  const handelUpdatePost = (postId) => {
    axios
      .put(
        `http://localhost:5000/posts/${postId}`,
        { body: editPostText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        dispatch(updatePost(res.data.UpdatedPost[0]));
      })
      .catch((err) => {
        console.error(err);
        console.log('"Failed to update post."');
      });
  };

  return (
    <div className="profile-container">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-picture">
            <Avatar
              size={120}
              src={user[0]?.profile_image || "default-profile.png"}
              alt="Profile"
            />
          </div>
          <div className="profile-info">
            <Title level={2}>{user[0]?.first_name}</Title>
            <p>@{user[0]?.user_name}</p>
          </div>
          {user[0]?.user_id == localStorage.getItem("user_id") && (
            <Button
              type="primary"
              onClick={() => navigate(`/home/profile/edit`)}
              className="edit-profile-btn"
            >
              Edit Profile
            </Button>
          )}
        </div>
        <Paragraph className="bio">{user?.bio}</Paragraph>
      </div>
      <Paragraph className="bio-text">{user?.bio}</Paragraph>
      <Row gutter={16} className="profile-stats">
        <Col span={8}>
          <Card className="profile-stat">
            <Space>
              <UsergroupAddOutlined className="followers-icon" />
              <Link to={`/home/profile/f/0`}>
                <Title level={5}>Followers</Title>
              </Link>
            </Space>
            <p>{follower || 0}</p>
          </Card>
        </Col>

        <Col span={8}>
          <Card className="profile-stat">
            <Space>
              <UsergroupAddOutlined className="followers-icon" />
              <Link to={`/home/profile/f/1`}>
                <Title level={5}>Following</Title>
              </Link>
            </Space>
            <p>{following || 0}</p>
          </Card>
        </Col>

        <Col span={8}>
          <Card className="profile-stat">
            <Space>
              <EnvironmentOutlined className="location-icon" />
              <Title level={5}>Location</Title>
            </Space>
            <p>{user[0]?.country || "Unknown"}</p>
          </Card>
        </Col>
      </Row>
      <br /> <br /> <br /> <br />
      <div className="createPost">
        <Input.TextArea
          placeholder="What's on your mind?"
          value={addPost.body || ""}
          onChange={(e) => setAddPost({ ...addPost, body: e.target.value })}
          rows={3}
          style={{ width: "750px", marginBottom: "10px" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Upload
            beforeUpload={handleFileUpload}
            showUploadList={false}
            accept="image/*,video/*"
          >
            <Tooltip title="Upload Image/Video">
              <Button
                type="text"
                icon={<CameraOutlined />}
                style={{
                  fontSize: "18px",
                  color: "#1890ff",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          </Upload>
          <Tooltip title="Post">
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleAddPost}
              style={{
                backgroundColor: "#1877f2",
              }}
            >
              Post
            </Button>
          </Tooltip>
        </div>

     
      </div>
      <br /> <br /> <br /> <br />
      <div className="posts-section">
        <h3>Your Posts</h3>
        {posts?.map((post, index) => (
          <Card
            key={index}
            style={{ marginBottom: "20px" }}
            className="post-card"
          >
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
                      <Button
                        onClick={() => {
                          setUpdateClicked(true);
                          setPostId(post.post_id);
                        }}
                        className="update-button"
                      >
                        Update
                      </Button>
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
                      <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handelDelete(post.post_id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </Col>
              </Row>

              <div className="post-actions">
                <Like
                  postId={post.post_id}
                  likedPosts={likedPosts}
                  setLikedPosts={setLikedPosts}
                  token={token}
                  icon={
                    <HeartFilled
                      style={{
                        color: likedPosts.includes(post.post_id)
                          ? "red"
                          : "black",
                      }}
                    />
                  }
                />
                <Button
                  icon={<MessageOutlined />}
                  type="link"
                  onClick={() => navigate(`./comments/${post.post_id}`)}
                >
                  Comments
                </Button>

                {!savedPost.includes(post?.post_id) ? (
                  <Button
                    type="link"
                    onClick={() => handleAddSave(post.post_id)}
                    icon={<SaveOutlined />}
                  >
                    Save Post
                  </Button>
                ) : (
                  <Button type="text" disabled>
                    Saved
                  </Button>
                )}
              </div>
            </Space>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;

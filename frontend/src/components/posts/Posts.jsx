import React, { useEffect, useState } from "react";
import "./posts.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  deletePost,
  setPosts,
  updatePost,
} from "../redux/reducers/slicePosts";
import { useNavigate, useParams } from "react-router-dom";
import Like from "../likes/Like";

import {
  Input,
  Button,
  Avatar,
  Card,
  List,
  Layout,
  Space,
  Typography,
  Upload,
  Tooltip,
  Modal,
  message,
} from "antd";
import {
  UserOutlined,
  SaveOutlined,
  DeleteOutlined,
  EditOutlined,
  CommentOutlined,
  SendOutlined,
  CameraOutlined,
  HeartFilled,
  MessageOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

const Posts = () => {
  const [postId, setPostId] = useState(0);
  const [updateClicked, setUpdateClicked] = useState(false);
  const [editPostText, setEditPostText] = useState("");
  const [addPost, setAddPost] = useState({
    body: "",
    image: null,
    video: null,
  });
  const postInfo = {
    body: addPost.body || null,
    image: addPost.image || null,
    video: addPost.video || null,
  };

  const { id } = useParams();
  const userId = id ? id : localStorage.getItem("user_id");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [savedPost, setSavedPost] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/followers/posty/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setPosts(res.data.data.reverse()));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [posts]);

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

  const handleFileUpload = (e) => {
    const select = e.target.file[0]

    if(!select){
      const isImage = file.type.startsWith("image/");
    }
    
    // const isVideo = file.type.startsWith("video/");

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

  const handleAddPost = () => {
    const formData = new FormData();

    formData.append("body", postInfo.body);

    if (postInfo.image) formData.append("image", postInfo.image);
    // if (postInfo.video) formData.append("video", postInfo.video);

    const uploadToCloudinary = (file) => {
      const isImage = file.type.startsWith("image/");
      // const isVideo = file.type.startsWith("video/");

      if (isImage || isVideo) {
        const cloudinaryData = new FormData();
        cloudinaryData.append("file", file);
        cloudinaryData.append("upload_preset", "project_5");
        cloudinaryData.append("cloud_name", "dkuojigr0");

         fetch("https://api.cloudinary.com/v1_1/dkuojigr0/image/upload", {
          method: "POST",
          body: cloudinaryData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.secure_url) {
              console.log(data.secure_url);
            } else {
              throw new Error("Cloudinary did not return a valid URL.");
            }
          })
          .catch((err) => {
            console.error("Cloudinary upload error:", err);
            message.error("Failed to upload file.");
            throw err;
          });
      }
      return Promise.resolve(null);
    };

    const uploadImageOrVideo = postInfo.image || postInfo.video;

    if (uploadImageOrVideo) {
      const file = postInfo.image || postInfo.video;

      uploadToCloudinary(file)
        .then((uploadedUrl) => {
          if (uploadedUrl) {
            formData.append(
              uploadedUrl.startsWith("http") ? "image" : "video",
              uploadedUrl
            );
          }

          return axios.post("http://localhost:5000/posts", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
        })
        .then((res) => {
          dispatch(createPost(res.data.post[0]));
          message.success("Post created successfully!");
          setAddPost({ body: "", image: null, video: null });
        })
        .catch((err) => {
          console.error("Error while creating post:", err);
          message.error("Failed to create post.");
        });
    } else {
      // إذا لم يكن هناك ملف مرفق، يتم إرسال المنشور مباشرةً
      axios
        .post("http://localhost:5000/posts", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(createPost(res.data.post[0]));
          message.success("Post created successfully!");
          setAddPost({ body: "", image: null, video: null });
        })
        .catch((err) => {
          console.error(err);
          message.error("Failed to create post.");
        });
    }
  };

  const handleUpdatePost = (postId) => {
    Modal.confirm({
      title: "Edit Post",
      centered: true,
      content: (
        <TextArea
          value={editPostText}
          onChange={(e) => setEditPostText(e.target.value)}
          rows={4}
        />
      ),
      okText: "Save Changes",
      cancelText: "Cancel",
      onOk: () => {
        axios
          .put(
            `http://localhost:5000/posts/${postId}`,
            { body: editPostText },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            dispatch(updatePost(res.data.updatedPost));
            setUpdateClicked(false);
            message.success("Post updated successfully!");
          })
          .catch((err) => {
            console.error(err);
            message.error("Failed to update post.");
          });
      },
    });
  };

  const handleDelete = (postId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this post?",
      content: "Once deleted, it cannot be recovered.",
      okText: "Yes",
      cancelText: "No",
      centered: true,
      onOk: () => {
        axios
          .delete(`http://localhost:5000/posts/${postId}/hard`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            dispatch(deletePost({ post_id: postId }));
            message.success("Post deleted successfully!");
          })
          .catch((err) => {
            console.error(err);
            message.error("Failed to delete post.");
          });
      },
    });
  };

  const handleAddSave = (postId) => {
    Modal.confirm({
      title: "Are you sure you want to save this post?",
      content: "You can view it later in your saved posts.",
      okText: "Yes",
      cancelText: "No",
      centered: true,
      onOk: () => {
        axios
          .post(
            `http://localhost:5000/posts/add&save/${postId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            message.success("Post saved successfully!");
            setSavedPost([...savedPost, postId]);
          })
          .catch((err) => {
            console.error(err);
            message.error("Failed to save post.");
          });
      },
    });
  };

  return (
    <Content
      style={{
        padding: "20px",
        margin: "0 auto",
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* Create Post Section */}
      <Card
        style={{
          marginBottom: "20px",
          padding: "20px",
          width: "950px",
          boxSizing: "border-box",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <TextArea
          placeholder="What's on your mind?"
          value={addPost.body || ""}
          onChange={(e) => setAddPost({ ...addPost, body: e.target.value })}
          rows={4}
          style={{ width: "100%", marginBottom: "10px" }}
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
      </Card>

      {/* Display Posts */}
      <List
        dataSource={posts}
        style={{
          width: "100%",
          flexGrow: 1,
        }}
        renderItem={(post) => (
          <Card
            style={{
              marginBottom: "20px",
              padding: "20px",
              width: "100%",
              boxSizing: "border-box",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            hoverable
          >
            <List.Item key={post.post_id}>
              <List.Item.Meta
                avatar={
                  post.profile_image ? (
                    <Avatar
                      size={50}
                      src={post.profile_image}
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    <Avatar icon={<UserOutlined />} />
                  )
                }
                title={<strong>{post.user_name}</strong>}
                description={
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#333", // اللون الرمادي الداكن
                      marginTop: "10px",
                      lineHeight: "1.8", // تباعد الأسطر
                      fontFamily: "'Poppins', sans-serif", // تغيير الخط إلى Poppins
                      fontWeight: "400", // خط عادي أو يمكن تغييره إلى bold
                    }}
                  >
                    <p>{post.body}</p>
                  </div>
                }
              />

              {/* صورة أو فيديو البوست */}
              {post.image && (
                <img
                  src={post.image}
                  alt="Post Image"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginTop: "10px",
                    objectFit: "cover",
                    height: "auto",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                />
              )}

              {post.video && (
                <video
                  controls
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                  src={post.video}
                />
              )}
            </List.Item>

            <Space
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* زر الإعجاب */}
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
                      fontSize: "20px",
                    }}
                  />
                }
              />

              {/* زر التعليقات */}
              <Button
                icon={<MessageOutlined />}
                type="link"
                style={{
                  color: "#1890ff",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
                onClick={() => navigate(`./comments/${post.post_id}`)}
              >
                Comments
              </Button>

              {/* زر الحفظ */}
              <Button
                icon={<SaveOutlined />}
                type="link"
                onClick={() => handleAddSave(post.post_id)}
                style={{
                  color: "#28a745",
                  fontSize: "18px",
                }}
              >
                Save
              </Button>

              {/* زر التعديل */}
              {post.user_id === parseInt(userId) && (
                <Button
                  icon={<EditOutlined />}
                  type="link"
                  onClick={() => {
                    setPostId(post.post_id);
                    setEditPostText(post.body);
                    setUpdateClicked(true);
                  }}
                  style={{
                    color: "#ffc107",
                    fontSize: "18px",
                  }}
                >
                  Edit
                </Button>
              )}

              {post.user_id === parseInt(userId) && (
                <Button
                  icon={<DeleteOutlined />}
                  type="link"
                  danger
                  onClick={() => handleDelete(post.post_id)}
                  style={{
                    fontSize: "18px",
                  }}
                >
                  Delete
                </Button>
              )}
            </Space>
          </Card>
        )}
      />
    </Content>
  );
};

export default Posts;

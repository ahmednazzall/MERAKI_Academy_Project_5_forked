import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById, updateUserById } from "../redux/reducers/sliceUser";
import {
  Button,
  Input,
  Form,
  Upload,
  Typography,
  Space,
  Avatar,
  message,
} from "antd";
import { CameraOutlined } from "@ant-design/icons";
import "./edit.css";

const { Title } = Typography;

const Edit = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const [newPass, setNewPass] = useState({});
  const [showPass, setShowPass] = useState(false);
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.users.users);

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
  }, []);

  const handleFileChange = (e) => {
    const select = e.target.files[0];

    if (!select) return;

    const data = new FormData();
    data.append("file", select);
    data.append("upload_preset", "project_5");
    data.append("cloud_name", "dniaphcwx");
    fetch("https://api.cloudinary.com/v1_1/dniaphcwx/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        axios
          .put(
            `http://localhost:5000/users/${userId}`,
            {
              profile_image: data.url,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            dispatch(updateUserById(res.data.result[0]));
            message.success("Profile image updated successfully!");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:5000/users/${userId}`, userInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(updateUserById(res.data.result[0]));
        setUserInfo({});
        message.success("User information updated successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePass = () => {
    if (newPass.new_pass === newPass.confirm) {
      if (newPass.oldPass) {
        axios
          .post(
            `http://localhost:5000/users/checkpass/${userId}`,
            { password: newPass.oldPass },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((result) => {
            if (result.data.success) {
              axios
                .put(
                  `http://localhost:5000/users/${userId}`,
                  {
                    password: newPass.new_pass,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then(() => {
                  message.success("Password updated successfully!");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        message.warning("Please insert the old password");
      }
    } else {
      message.warning("Passwords must match");
    }
  };

  return (
    <div className="edit-container">
      <Title level={3}>Edit Profile</Title>

      <div className="profile-picture">
        <div className="profile-image-container">
          <Avatar size={120} src={user[0]?.profile_image} />
          <label htmlFor="file-upload" className="camera-icon-overlay">
            <CameraOutlined className="camera-icon" />
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>

      <Form
        layout="vertical"
        initialValues={{
          user_name: user[0]?.user_name,
          first_name: user[0]?.first_name,
          last_name: user[0]?.last_name,
          email: user[0]?.email,
          country: user[0]?.country,
          bio: user[0]?.bio,
        }}
      >
        <Form.Item label="User name" name="user_name">
          <Input
            onChange={(e) => {
              setUserInfo({ ...userInfo, user_name: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item label="First name" name="first_name">
          <Input
            onChange={(e) => {
              setUserInfo({ ...userInfo, first_name: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item label="Last name" name="last_name">
          <Input
            onChange={(e) => {
              setUserInfo({ ...userInfo, last_name: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input
            type="email"
            onChange={(e) => {
              setUserInfo({ ...userInfo, email: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item label="Country" name="country">
          <Input
            onChange={(e) => {
              setUserInfo({ ...userInfo, country: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item label="Bio" name="bio">
          <Input.TextArea
            onChange={(e) => {
              setUserInfo({ ...userInfo, bio: e.target.value });
            }}
          />
        </Form.Item>

        <Button type="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Form>

      <div className="password-section">
        {!showPass ? (
          <a href="#" onClick={() => setShowPass(true)}>
            Change Password?
          </a>
        ) : (
          <div>
            <Input.Password
              placeholder="Enter old password"
              onChange={(e) =>
                setNewPass({ ...newPass, oldPass: e.target.value })
              }
            />
            <Input.Password
              placeholder="Enter new password"
              onChange={(e) =>
                setNewPass({ ...newPass, new_pass: e.target.value })
              }
            />
            <Input.Password
              placeholder="Confirm new password"
              onChange={(e) =>
                setNewPass({ ...newPass, confirm: e.target.value })
              }
            />
            <Space>
              <Button type="primary" onClick={handleChangePass}>
                Submit
              </Button>
              <Button onClick={() => setShowPass(false)}>Cancel</Button>
            </Space>
          </div>
        )}
      </div>
    </div>
  );
};

export default Edit;

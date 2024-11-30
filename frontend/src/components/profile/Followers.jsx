import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Row, Col, Avatar, Typography, Space } from "antd";
import {
  setFollowers,
  setFollowing,
  unFollow,
  removeFollower,
} from "../redux/reducers/sliceFollowers";
import "./follower.css";

const { Text } = Typography;

const Followers = () => {
  const dispatch = useDispatch();
  const condition = useParams();
  const [show, setShow] = useState(condition.id == 1);
  const { token, userId } = useSelector((state) => state.auth);

  const following = useSelector((state) => state.followers.following);
  const follower = useSelector((state) => state.followers.myFollowers);

  useEffect(() => {
    const url = show
      ? `http://localhost:5000/followers/${userId}/following`
      : `http://localhost:5000/followers/${userId}/follower`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        show
          ? dispatch(setFollowing(result.data.data))
          : dispatch(setFollowers(result.data.data));
      })
      .catch((err) => console.log(err));
  }, [show, dispatch, token, userId]);

  const handleUnfollow = (id) => {
    const url = show
      ? `http://localhost:5000/followers/${id}/unfollow`
      : `http://localhost:5000/followers/${id}/trimFollower`;

    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        show ? dispatch(unFollow(id)) : dispatch(removeFollower(id));
      })
      .catch((err) => console.log(err));
  };

  const renderList = (list, isFollowing) => (
    <div style={{ marginTop: "10px" }}>
      {list.map((elem) => (
        <div
          key={isFollowing ? elem.following_id : elem.follower_id}
          className="user-card"
        >
          <Space align="center">
            
            <Avatar
              size={64}

              src={elem.profile_image || "/default-profile.png"}
              alt={elem.user_name}

              src={elem.profile_image || "/default-avatar.png"}
              alt="profile"
              style={{ border: "2px solid #1890ff" }}
            />
            <Link
              to={`/home/profile/${
                isFollowing ? elem.following_id : elem.follower_id
              }`}
            >
              <Text strong className="username">
                {elem.user_name}
              </Text>
            </Link>
          </Space>
          
          {userId === (isFollowing ? elem.following_id : elem.follower_id) && (
          <Button
            type="primary"
            danger
            shape="round"
            onClick={() =>
              handleUnfollow(isFollowing ? elem.following_id : elem.follower_id)
            }
          >
            {isFollowing ? "Unfollow" : "Remove"}
          </Button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="followers-container">
      <Row justify="center">
        <Col span={24}>
          <Card
            title={
              <Space align="center">
                <Text className="section-title">
                  {show ? "Following" : "Followers"}
                </Text>
                <Button
                  type="link"
                  onClick={() => setShow(!show)}
                  className="switch-button"
                >
                  Switch to {show ? "Followers" : "Following"}
                </Button>
              </Space>
            }
            bordered={false}
            className="custom-card"
          >
            {show
              ? following?.length
                ? renderList(following, true)
                : <p className="empty-text">No following yet.</p>
              : follower?.length
              ? renderList(follower, false)
              : <p className="empty-text">No followers yet.</p>}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Followers;

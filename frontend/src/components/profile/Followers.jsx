import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom"; // Import Link
import { Card, Button, Row, Col } from "antd";
import {
  setFollowers,
  setFollowing,
  unFollow,
  removeFollower,
} from "../redux/reducers/sliceFollowers";
import "./follower.css";

const Followers = () => {
  const dispatch = useDispatch();
  const condition = useParams();
  const [show, setShow] = useState(condition.id == 1 ? true : false);
  const { token, userId } = useSelector((state) => state.auth);

  const following = useSelector((state) => state.followers.following);
  const follower = useSelector((state) => state.followers.myFollowers);

  useEffect(() => {
    show
      ? axios
          .get(`http://localhost:5000/followers/${userId}/following`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            dispatch(setFollowing(result.data.data));
          })
          .catch((err) => console.log(err))
      : axios
          .get(`http://localhost:5000/followers/${userId}/follower`)
          .then((result) => {
            dispatch(setFollowers(result.data.data));
          })
          .catch((err) => console.log(err));
  }, [show]);

  const handleUnfollow = (id) => {
    if (!show) {
      dispatch(removeFollower(id));

      axios
        .delete(`http://localhost:5000/followers/${id}/trimFollower`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {})
        .catch((err) => console.log(err));
    } else {
      dispatch(unFollow(id));
      axios
        .delete(`http://localhost:5000/followers/${id}/unfollow`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {})
        .catch((err) => console.log(err));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* <Row gutter={20}> */}
        {!show && <Col span={24}>
          <Card
            title="Followers"
            bordered={false}
            style={{ width: "59em", textAlign: "center" }}
            onClick={() => setShow(false)}
          >
            <Button type="link" size="large">
              {follower?.length} Followers
            </Button>
            {follower?.length ? (
              <div style={{ marginTop: "10px" }}>
                {follower.map((elem) => (
                  <div key={elem.follower_id} style={{ marginBottom: "10px" }}>
                    {/* Wrap the username in a Link component */}
                    <Link to={`/profile/${elem.follower_id}`}>
                      <h5>@{elem.user_name}</h5>
                    </Link>
                    <Button
                      type="link"
                      danger
                      onClick={() => handleUnfollow(elem.follower_id)}
                    >
                      Remove Follower
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No followers</p>
            )}
          </Card>
        </Col> }
       
        {show&&  <Col span={24}>
          <Card
            title="Following"
            bordered={false}
            style={{ width: "59em", textAlign: "center" }}
            onClick={() => setShow(true)}
          >
            <Button type="link" size="large">
              {following?.length} Following
            </Button>
            {following?.length ? (
              <div style={{ marginTop: "10px" }}>
                {following.map((elem) => (
                  <div key={elem.following_id} style={{ marginBottom: "10px" }}>
                    {/* Wrap the username in a Link component */}
                    <Link to={`/profile/${elem.following_id}`}>
                      <h5>@{elem.user_name}</h5>
                    </Link>
                    <Button
                      type="link"
                      danger
                      onClick={() => handleUnfollow(elem.following_id)}
                    >
                      Unfollow
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No following</p>
            )}
          </Card>
        </Col>}
       
      {/* </Row> */}
    </div>
  );
};

export default Followers;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
useParams;
const Followers = () => {
  const condition = useParams();

  const { token, userId } = useSelector((state) => {
    return state.auth;
  });
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);

  useEffect(() => {
    if (condition.id == 1) {
      axios
        .get(`http://localhost:5000/followers/${userId}/following`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          setFollowing(result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(`http://localhost:5000/followers/${userId}/follower`)
        .then((result) => {
          setFollower(result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [follower, following]);

  const handleUnfollow = (id) => {
    if (follower.length) {
      axios
        .delete(
          `http://localhost:5000/followers/${id}/trimFollower`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((result) => {
          // console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .delete(
          `http://localhost:5000/followers/${id}/unfollow`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((result) => {
          // console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      {follower?.length ? (
        <div>
          <h3>Followers</h3>
          {follower?.map((elem) => {
            return (
              <div key={elem.follower_id}>
                <h5>@{elem.user_name}</h5>

                <button
                  onClick={() => {
                    handleUnfollow(elem.follower_id);
                  }}
                >
                  remove follower
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
      {following?.length ? (
        <div>
          <h3>People you are Following</h3>
          {following?.map((elem) => {
            return (
              <div key={elem.following_id}>
                <h5>@{elem.user_name}</h5>

                <button
                  onClick={() => {
                    handleUnfollow(elem.following_id);
                  }}
                >
                  unfollow
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Followers;

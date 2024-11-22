import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setFollowers,
  setFollowing,
  unFollow,
  removeFollower,
} from "../redux/reducers/sliceFollowers";
useParams;
const Followers = () => {
  const dispatch = useDispatch();
  const condition = useParams();
  const [show, setShow] = useState(condition.id == 1 ? true : false);
  const { token, userId } = useSelector((state) => {
    return state.auth;
  });

  const following = useSelector((state) => {
    return state.followers.following;
  });
  const follower = useSelector((state) => {
    return state.followers.myFollowers;
  });

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
          .catch((err) => {
            console.log(err);
          })
      : axios
          .get(`http://localhost:5000/followers/${userId}/follower`)
          .then((result) => {
            dispatch(setFollowers(result.data.data));
          })
          .catch((err) => {
            console.log(err);
          });
  }, []);

  const handleUnfollow = (id) => {
    if (!show) {
      dispatch(removeFollower(id));

      axios
        .delete(`http://localhost:5000/followers/${id}/trimFollower`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          // console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(unFollow(id));
      axios
        .delete(`http://localhost:5000/followers/${id}/unfollow`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
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
      {!show ? (
        <div>
          {follower?.length ? (
            <>
              <h3>Followers</h3>
              {follower.map((elem) => {
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
            </>
          ) : (
            <h3>Followers list empty</h3>
          )}
        </div>
      ) : (
        <div>
          {following?.length ? (
            following.map((elem) => {
              return (
                <div key={elem.following_id}>
                  <h3>People you are Following</h3>
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
            })
          ) : (
            <h3>Following list empty</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default Followers;

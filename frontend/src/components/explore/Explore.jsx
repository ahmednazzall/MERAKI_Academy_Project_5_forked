import axios from "axios";
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../redux/reducers/sliceUser";

const Explore = () => {
  const dispatch = useDispatch();
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);
  const { token, userId } = useSelector((state) => {
    return state.auth;
  });

  const users = useSelector((state) => {
    return state.users.users;
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(getAllUsers(result.data.Users));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/followers/${userId}/following`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        let found = result.data.data.map((elem) => {
          return elem.following_id;
        });

        setFollowing(found);
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .get(`http://localhost:5000/followers/${userId}/follower`)
    //   .then((result) => {
    //     // setFollower(result.data.result.length);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [following]);

  const handFollow = (id) => {
    axios
      .post(
        `http://localhost:5000/followers/${id}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h5>Connect with new people</h5>
      {users?.map((user) => {
        return (
          <div key={user.user_id}>
            {user.user_id != userId && !following.includes(user.user_id) && (
              <div>
                <img src={user.profile_image} />
                <p>{`${user.user_name} ${user.last_name}`}</p>
                <p>@{user.user_name}</p>

                <button
                  onClick={() => {
                    handFollow(user.user_id);
                  }}
                >
                  follow
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Explore;

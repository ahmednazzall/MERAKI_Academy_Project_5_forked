import axios from "axios";
import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../redux/reducers/sliceUser";

const Explore = () => {
  const dispatch = useDispatch();

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
  }, [users]);



//   console.log(users);
  
  const handFollow = (id) => {
    axios
      .post(`http://localhost:5000/followers/${id}/follow`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
            {user.user_id != userId && (
              <div>
                <img src={user.profile_image} />
                <p>{`${user.first_name} ${user.last_name}`}</p>
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

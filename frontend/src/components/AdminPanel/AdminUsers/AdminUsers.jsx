import React, { useEffect } from "react";
import "./users.css";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "antd";
import axios from "axios";
import {
  getAllUsers,
  SoftDeleteUserById,
  updateUserById,
} from "../../redux/reducers/sliceUser";
const AdminUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((users) => {
    return users.users.users;
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(getAllUsers(res.data.Users));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [users]);

  // de active user
  const handleDeactivate = async (id) => {
    try {
      const deactivate = await axios.put(
        `http://localhost:5000/users/sd/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  // permanent delete
  const handleDelete = async (id) => {
    try {
      const deleteSUers = await axios.delete(
        `http://localhost:5000/users/hd/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleActivate = async (id) => {
    try {
      const activate = await axios.put(
        `http://localhost:5000/users/${id}`,
        { is_deleted: "0" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="parentRender">
      {users?.map((elem) => {
        return (
          <div key={elem?.user_id}>
            {elem.user_id != localStorage.getItem("user_id") && (
              <div className="parentUserAdmin">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={elem?.profile_image} />
                  <h4>@{elem?.user_name}</h4>
                </div>
                <p>online: {elem?.is_login ? "true" : "false"}</p>
                <div>
                  {elem?.is_deleted ? (
                    <Button
                      onClick={() => {
                        handleActivate(elem?.user_id);
                      }}
                    >
                      activate
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        handleDeactivate(elem?.user_id);
                      }}
                    >
                      deactivate
                    </Button>
                  )}

                  <Button
                    onClick={() => {
                      handleDelete(elem?.user_id);
                    }}
                  >
                    delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AdminUsers;

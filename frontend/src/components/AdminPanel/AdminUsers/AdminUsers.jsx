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
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
const { confirm } = Modal;

const AdminUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((users) => {
    return users.users.users;
  });
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/users/admin/all", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       dispatch(getAllUsers(res.data.Users));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [users]);

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
      console.log(deactivate.data);
      dispatch(updateUserById(deactivate.data.result[0]));
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
      dispatch(SoftDeleteUserById(deleteSUers.data.result[0]));
    } catch (error) {
      console.log(error);
    }
  };
  // activate user
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
      dispatch(updateUserById(activate.data.result[0]));
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(users);
  const showedUser = users.filter((user) => {
    return user.role_id != 1;
  });
  // console.log(showedUser);
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this user?",
      icon: <ExclamationCircleFilled />,
      content: "user will be deleted permanently",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("ok");
        handleDelete(id)
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const showDeActivateConfirm = (id) => {
    confirm({
      title: "Are you sure deactivate this user?",
      icon: <ExclamationCircleFilled />,
      content: "user will be deactivated",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeactivate(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div className="parentRender">
      {showedUser?.map((elem) => {
        return (
          <div key={elem?.user_id}>
            {elem.user_id != localStorage.getItem("user_id") && (
              <div className="parentUserAdmin">
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "1em",
                  }}
                >
                  <Avatar src={elem?.profile_image} className="image" />
                  <h3>@{elem?.user_name}</h3>
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
                        showDeActivateConfirm(elem?.user_id);
                      }}
                    >
                      deactivate
                    </Button>
                  )}

                  <Button
                    onClick={() => {
                      showDeleteConfirm(elem?.user_id);
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

import React, { useEffect } from "react";
import "./islogin.css";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "antd";
import axios from "axios";
import { getAllUsers } from "../../redux/reducers/sliceUser";
import {useNavigate} from "react-router-dom"
const AdminIsLogin = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const users = useSelector((users) => {
    return users.users.users;
  });

  const isLogin = users.filter((elem) => {
    return elem.is_login == true;
  });
  // console.log(users);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/users/all", {
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


  return (
    <div className="parentLoginAdmin">
      {isLogin?.map((user) => {
        return (
          <div key={user.user_id} className="innerLoginAdmin" >
            <div className="infoAdminLogin">
              <Avatar src={user.profile_image} />
              <h5>@{user.user_name}</h5>
              
            </div>

            <Button onClick={()=>{navigate(`/home/profile/${user.user_id}`)}}>Visit user</Button>
          </div>
        );
      })}
    </div>
  );
};

export default AdminIsLogin;

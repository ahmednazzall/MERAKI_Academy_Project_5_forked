import React, { useEffect, useState } from "react";
import axios from "axios";
import "./chat.css";
import { useDispatch, useSelector } from "react-redux";
import { setFollowing } from "../redux/reducers/sliceFollowers";
import socketServer from "../Socket-Io/SocketServer";
import io from "socket.io-client";

import ChatMessages from "./ChatMessages";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
/* 
    setSocket(socketServer({ token,  user_id }))

*/


const Chat = ({socket}) => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [socket, setSocket] = useState(null);
  const [to, setTo] = useState("");
  const [show, setShow] = useState(false);
  const users = useSelector((state) => {
    return state.followers.following;
  });
 
  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/followers/${user_id}/following`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        // console.log(result);

        dispatch(setFollowing(result.data.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [users]);

  useEffect(() => {
    // const socketConnection = io("http://localhost:5000", {
    //   extraHeaders: {
    //     user_id,
    //     token,
    //   },
    // });
    // setSocket(socketConnection);

    // socketConnection?.on("connect", () => {
    //   console.log("io connected");
    // });
    // socketConnection?.on("connect_error", (error) => {
    //   console.log("problem", error.message);
    // });
    // return () => {
    //   socketConnection?.removeAllListeners();
    //   socketConnection?.disconnect();
    //   setShow(false);
    // };
  }, []);

  return (
    <div>
      <h5 className="Head-Chat">Chat messages</h5>

      {users?.map((user) => {
        return (
          <div
            key={user.user_id}
            onClick={() => {
              setTo(user.user_id);
              setShow(true);
            }}
          >
            <img
              src={user?.profile_image}
              className="userPic-Message"
              alt="userPicture"
            />
           
            <p className="User-Name-Chat">{user.user_name}</p>
          </div>
        );
      })}

      {show && <ChatMessages socket={socket} to={to} setShow={setShow} />}
    </div>
  );
};

export default Chat;

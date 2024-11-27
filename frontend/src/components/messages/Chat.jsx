import React, { useEffect, useState } from "react";
import axios from "axios";
import "./chat.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/reducers/sliceUser";
import socketServer from "../Socket-Io/SocketServer";
import ChatMessages from "./ChatMessages";
import { useNavigate } from "react-router-dom";
/* 
    setSocket(socketServer({ token,  user_id }))

*/
import io from "socket.io-client"

// const socket=io("http://localhost:5000", {
//   extraHeaders: {
//     user_id,
//     token,
//   },
// });

const Chat = () => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [to, setTo] = useState("");
  const [show, setShow] = useState(false);
  const [showMessenger, setShowMessenger] = useState(false)
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
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    socket?.on("connect", () => {
      console.log("yes");
    });
    socket?.on("connect_error", (error) => {
      console.log("problem", error.message);
    });
    return () => {
      socket?.close();
      socket?.removeAllListeners();
      // setShow(false);
    };
  }, [socket]);

  return (
    <div>
      <h5>Chat messages</h5>
      {!showMessenger ? <button onClick={()=>{
        setSocket(socketServer({ token, user_id }))
        setShowMessenger(true)}}>show messages</button> :
      <>
      {users?.map((user) => {
        return (
          localStorage.getItem("user_id") != user.user_id && (
            <div
              key={user.user_id}
              onClick={() => {
                // setSocket(socketServer({ token, user_id }));
                setTo(user.user_id);
                setShow(true);
              }}
            >
              <img
                src={user?.profile_image}
                className="userPic"
                alt="userPicture"
              />
              <p>{user.user_name}</p>
            </div>
          )
        )
      })}
      <button onClick={()=>{setShowMessenger(false)}}>hide messages</button>
      </>
      
      }
      
      {show && <ChatMessages socket={socket} to={to} setShow={setShow} />}
    </div>
  );
};

export default Chat;

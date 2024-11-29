import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ChatMessages = ({ socket, to, setShow }) => {
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("user_id");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [allMsgs, setAllMsgs] = useState([]);
  const token = localStorage.getItem("token");

  // console.log(loggedInUser);

  useEffect(() => {
    socket?.on("message", receive);
    return () => {
      socket?.off("message", receive);
    };
  }, [allMsgs]);

  const receive = (data) => {
    console.log(data);
    setAllMsgs([...allMsgs, data]);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/messages/${userId}/${to}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setAllMsgs(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/users/all")
      .then((res) => {
        const findUser = res.data.Users.find((user) => {
          return user.user_id == userId;
        });

        setLoggedInUser(findUser.user_name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSend = () => {
    if (message !== "") {
      socket.emit("message", { to, from: userId, message });
      setMessage("");
      socket.emit("notification", {
        message: `new message from ${loggedInUser}`,
        to,
        from:userId
      });
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setShow(false);
        }}
      >
        X
      </button>
      <h5>chat Messages</h5>
      <input
        value={message}
        type="text"
        placeholder="write your message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button type="button" onClick={handleSend}>
        Send
      </button>

      {allMsgs.length > 0 &&
        allMsgs.map((message) => {
          return (
            <div key={message.message_id}>
              <span>
                <img
                  src={message.profile_image}
                  height={"50px"}
                  width={"50px"}
                  style={{ borderRadius: "50%" }}
                />
                {/* {message.sender} */} <strong>{message.message_text}</strong>
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default ChatMessages;

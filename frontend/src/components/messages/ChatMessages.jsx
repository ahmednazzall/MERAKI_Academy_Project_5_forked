import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ChatMessages = ({ socket, to, setShow }) => {
  //   const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("user_id");
  // console.log("id",userId);
  // console.log("to",to);
//   console.log(socket);
  
  const users = useSelector((state) => {
    return state.followers.following;
  });
  const [allMsgs, setAllMsgs] = useState([]);
  const token = localStorage.getItem("token");
  const [forTo, setForTo] = useState(null);
  const [fromTo, setFromTo] = useState(null);
  useEffect(() => {
    socket?.on("message", receive);
    return () => {
      socket.off("message", receive);
    };
  }, [allMsgs]);

  const receive = (data) => {
    console.log(data);
    // setAllMsgs([...allMsgs, data]);
   
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/messages/${userId}/${to}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        // console.log(result);

        setAllMsgs(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [allMsgs]);

  const handleSend = () => {
    
    socket.emit("message", { to, from: userId, message });
    setMessage("");
  };
  // console.log(fromTo);


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
        allMsgs.map((message, i) => {

          
          return (
            <div key={message.message_id}>
              <span>
                
                <img
                  src={message.profile_image}
                  height={"50px"}
                  width={"50px"}
                  style={{ borderRadius: "50%" }}
                />
                {message.sender} <strong>{message.message_text}</strong>
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default ChatMessages;

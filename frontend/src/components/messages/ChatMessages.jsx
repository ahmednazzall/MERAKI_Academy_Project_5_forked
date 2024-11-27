import axios from "axios";
import React, { useState, useEffect } from "react";

const ChatMessages = ({ socket, to, setShow }) => {
  //   const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("user_id");
  const [allMsgs, setAllMsgs] = useState([]);
  const token = localStorage.getItem("token");
  const [clicked, setClicked] = useState(false);
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
      .get(`http://localhost:5000/messages/${to}`, {
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
      
    if (clicked) {
      axios
        .post(
          "http://localhost:5000/messages",
          { receiver: to, message_text: message },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((result) => {
          setClicked(false)
          setMessage("")
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return ()=>{
        socket.off("message", receive);
    }
  }, [allMsgs]);

 
  const handleSend = () => {
      socket.emit("message", { to, from: userId, message });
    //   setClicked(true)
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
        allMsgs.map((message, i) => {            
          return (
            <div key={i}>
              <span>
                form {message.sender} <strong>{message.message_text}</strong>
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default ChatMessages;

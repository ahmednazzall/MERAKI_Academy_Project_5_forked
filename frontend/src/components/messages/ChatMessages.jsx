import { ExclamationCircleFilled } from "@ant-design/icons";
import { Input } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ChatMessages = ({ socket, to, setShow }) => {
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("user_id");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [allMsgs, setAllMsgs] = useState([]);
  const token = localStorage.getItem("token");
  const [allUsers , setAllUsers] = useState([])
  // console.log(loggedInUser);
  const [messageTimeShow , setMessageTimeShow] = useState({show : 0})

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
        setAllUsers(res.data.Users)
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
  const showPromiseConfirmSoftDeleted = (id) => {
    confirm({
      title: 'Do you want to delete this comment?',
      icon: <ExclamationCircleFilled />,
      content:"When clicked the OK button, this comment will be will be deleted permanently",
      onOk() {
        return new Promise((resolve, reject) => {          
        return  setTimeout(handleDeleteComment(id)? resolve : reject, 1500);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  };
  return (
    <div className="Message-Chat-Card">
      <button
      className="Exit-Chat"
        onClick={() => {
          setShow(false);
        }}
      >
        X
      </button>
     
     

      {allMsgs.length > 0 &&
        allMsgs.map((message) => {
          return (
            <div key={message.message_id} 
            className={message.sender == userId ? "Message-Containor-User" : "Message-Containor"}
            >
              <span>
                {messageTimeShow.show == message.message_id ?  <p className={message.sender != userId ? "Message-Time" : "Message-Time-you"}>{message.created_at.split('').slice(0,10).join().replaceAll(',','')}</p> : null}
                <img
                  src={message.profile_image}
                  height={"50px"}
                  width={"50px"}
                  style={{ borderRadius: "50%" }}
                />
              {allUsers?.map((user)=>{
                if (user.user_id == message.sender && user.user_id != userId) {
                  return <h4 className="UserName-ChatMessage" key={user.user_id}>{user.user_name}</h4>
                }else if (user.user_id == message.sender && user.user_id == userId) {
                  return <h4 key={user.user_id} className="UserName-ChatMessage-You">you</h4>
                }
            
              })}
                {/* {message.sender} */} <div className={message.sender == userId ? "Message-Chat-you" : "Message-Chat"}
                onClick={(e)=>{
                  if (messageTimeShow.show != message.message_id) {
                    setMessageTimeShow({show : message.message_id})
                    
                  }
                 else{
                  setMessageTimeShow({show : 0})

                 }
                  
                }}
                >{message.message_text}</div>
              </span>
            </div>
          );
        })}
        <div className="Send-Perent">
         <Input className="Send_Input"
        value={message}
        type="text"
        placeholder="write your message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button type="button" onClick={handleSend}
      className="Send_Button"
      >
        Send
      </button>
      </div>
    </div>
  );
};

export default ChatMessages;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Avatar, Badge } from "antd";
import { AiFillBell } from "react-icons/ai";
import "./notify.css";


const Notification = ({ socket }) => {
  const token = localStorage.getItem("token");
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState([]);
  const [count, setCount] = useState(0);
  // const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    socket?.on("notification", (data) => {
      console.log("from notify", data);
      setNote((prev) => [...prev, data]);
      setCount((prev) => prev + 1);
    });

    return () => {
      socket?.off("notification");
    };
  }, [socket]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/notify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        // console.log(result);
        setNote(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {};
  }, []);
 
  return (
    <div>
      <Badge count={count}>
        <Avatar
          shape="circle"
          size="large"
          icon={<AiFillBell />}
          className="notification-icon"
          onClick={() => {
            setCount(0);
            setShowNote(!showNote);
          }}
        />
      </Badge>

      {showNote && (
        <div className="notification-window">
          <div className="notification-header">
            <h2>Notifications</h2>
          </div>
          <div className="notification-list">
            {note.reverse().map((notify) => {
              const at = new Date(notify.notification_time);
              return (
                <div key={notify.notification_id} className="notification-item">
                  <span className="img">
                    {" "}
                    <img
                      src={notify.profile_image || ""}
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </span>
                  <span  className="notification-message">{notify.action}</span>

                  <span className="notification-time">{at.toLocaleTimeString()}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;

import React, { useEffect, useState } from "react";

const Notification = ({ socket }) => {
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");
  useEffect(() => {
    socket?.on("notification", (data) => {
      console.log("from notify", data);
      setNote(data.message);
    });

    return () => {
      socket?.off("notification");
    };
  }, [socket]);

  return (
    <div>
      <p
        onClick={() => {
          setShowNote(!showNote);
        }}
      >
        Notification
      </p>
      {showNote && (
        <ul>
          <li>{note}</li>
        </ul>
      )}
    </div>
  );
};

export default Notification;

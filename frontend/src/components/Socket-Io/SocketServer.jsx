import io from "socket.io-client";

const socketServer = ({ user_id, token }) => {
  return io("http://localhost:5000", {
    extraHeaders: {
      user_id,
      token,
    },
  });
};

export default socketServer
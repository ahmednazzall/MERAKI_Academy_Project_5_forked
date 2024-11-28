const messageHandler = require("./SendMessage");
const { login } = require("./users");

const clients = {};

const ioConnection = (socket) => {
  console.log("connected");

  const userId = socket.handshake.headers.user_id;
  clients[userId] = { socket_id: socket.id, userId };
  // socket.on("join-room",(data)=>{
  //   socket.join(data)
  // })
  messageHandler(socket);

  socket.on("notification", (data) => {
    // socket.join(userId);

    // console.log(data);

    socket.to(`room-${data.to}`).emit("notification", data);
  });
  // console.log(clients);

  socket.on("disconnect", () => {
    for (const key in clients) {
      if (clients[key].socket_id === socket.id) {
        delete clients[key];
      }
    }
  });
};

module.exports = ioConnection;

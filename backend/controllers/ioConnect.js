const messageHandler = require("./message");

const clients = {};

const ioConnection = (socket) => {
  userId = socket.handshake.headers.user_id;
  clients[userId] = { socket_id: socket.id, userId };

  messageHandler(socket);

  socket.on("disconnect", () => {
    for (const key in clients) {
      if (clients[key].socket_id === socket.id) {
        delete clients[key];
      }
    }
  });
};

module.exports = ioConnection;

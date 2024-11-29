const {notify} = require("./notifications");
const messageHandler = require("./SendMessage");

const clients = {};

const ioConnection = (socket) => {
  console.log("connected");

  const userId = socket.handshake.headers.user_id;
  clients[userId] = { socket_id: socket.id, userId };
  // socket.on("join-room",(data)=>{
  //   socket.join(data)
  // })
  messageHandler(socket);

  notify(socket)

  

  socket.on("disconnect", () => {
    for (const key in clients) {
      if (clients[key].socket_id === socket.id) {
        delete clients[key];
      }
    }
  });
};

module.exports = ioConnection;

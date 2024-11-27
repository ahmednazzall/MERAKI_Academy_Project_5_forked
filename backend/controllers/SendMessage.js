const messageHandler = (socket) => {
  socket.on("message", (data) => {

    socket.to(`room-${data.to}`).emit("message", data);
    // socket.to(data.room).emit("message", data);
    socket.emit("message", data);
  });
};

module.exports = messageHandler;

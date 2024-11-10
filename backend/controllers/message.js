const messageHandler = (socket, io) => {
  socket.on("message", (data) => {
    data.success = true;
    data.to.forEach((element) => {
      return socket.to(`room-${element}`).emit("message", data);
    });

    socket.emit("message", data);
  });
};

module.exports = messageHandler;

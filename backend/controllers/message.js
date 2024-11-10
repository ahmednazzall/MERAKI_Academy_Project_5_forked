const messageHandler = (socket, io) => {
  socket.on("message", (data) => {
    data.success = true;
    // console.log(data);
    
    data.to.forEach((element) => {
      return socket.to(`room-${element}`).emit("message", data.message);
    });

    socket.emit("message", data);
  });
};

module.exports = messageHandler;

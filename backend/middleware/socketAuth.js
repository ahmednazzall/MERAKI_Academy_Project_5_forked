const jwt = require("jsonwebtoken");
const socketAuth = (socket, next) => {
  const headers = socket.handshake.headers;

  if (!headers.token) {
    next(new Error("Invalid"));
  } else {
    jwt.verify(headers.token, process.env.SECRET, (err, result) => {
      if (err) {
        next(new Error("Forbidden"));
      }
      socket.join(`room-${headers.user_id}`);
      socket.user = { token: result, user_id: headers.user_id };
      next();
    });
  }
};

module.exports = socketAuth;

const express = require("express");
const app = express();
require("dotenv").config();
const cores = require("cors");
app.use(cores());
const PORT = process.env.PORT;
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const pool = require("./models/db");
const rolesRouter = require("./routes/roles");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const followersRouter = require("./routes/followers");
const greetingRouter=require("./routes/greeting")
const socketAuth = require("./middleware/socketAuth");
const ioConnection = require("./controllers/ioConnect");
app.use(express.json());

app.use("/roles", rolesRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/followers", followersRouter);
app.use("/greeting",greetingRouter)

io.use(socketAuth);
io.on("connection", ioConnection);

server.listen(PORT, () => {
  console.log(`Server Listening At PORT ${PORT}`);
});

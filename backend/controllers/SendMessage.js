const { pool } = require("../models/db");

const messageHandler = (socket) => {
  socket.on("message", async (data) => {
    const userId = socket.handshake.headers.user_id;

    // socket.join(`room-${userId}`);
    const query = `INSERT INTO messages(sender,receiver,message_text)
  VALUES ($1,$2,$3) RETURNING*`;
    const values = [data.from, data.to, data.message];
    try {
      const result = await pool.query(query, values);

      const message_id = result.rows[0].message_id;
      // console.log(result.rows);

      const created_at = result.rows[0].created_at;

      const sendResult = await pool.query(
        `SELECT profile_image FROM users where user_id=$1`,
        [data.from]
      );

      const profile_image = sendResult.rows[0].profile_image;

      socket.to(`room-${data.to}`).emit("message", {
        message_id,
        message_text: data.message,
        sender: data.from,
        created_at,
        profile_image,
      });
      socket.emit("message", {
        message_id,
        message_text: data.message,
        sender: data.from,
        created_at,
        profile_image,
      });
    } catch (error) {
      console.error(error);
    }

    // socket.to(data.room).emit("message", data);
  });
};

module.exports = messageHandler;

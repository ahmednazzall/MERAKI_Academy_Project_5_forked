const { pool } = require("../models/db");

const notify = (socket) => {
  socket.on("notification", async (data) => {
    const userId = socket.handshake.headers.user_id;
    const query = `INSERT INTO notifications (sender,receiver,action)
        VALUES ($1,$2,$3) RETURNING*`;
    const values = [userId, data.to, data.message];

    try {
      const result = await pool.query(query, values);

      const notification_id = result.rows[0].notification_id;
      const notification_time = result.rows[0].notification_time;

      const sendResult = await pool.query(
        `SELECT profile_image FROM users where user_id=$1`,
        [data.from]
      );

      const profile_image = sendResult.rows[0].profile_image;

      socket.to(`room-${data.to}`).emit("notification", {
        notification_id,
        notification_time,
        profile_image,
        sender: data.from,
        action: data.message,
      });
    } catch (error) {
      console.error(error);
    }
  });
};

const getNotify = async (req,res) => {
const {userId}=req.token
const query=`SELECT n.action,n.sender,u.profile_image ,n.notification_id ,n.notification_time FROM notifications n
  join users u on n.sender=u.user_id
  where  n.receiver=$1
  ORDER BY n.notification_time DESC
  limit 5
  `
  try {
    const result=await pool.query(query,[userId])
    res.status(200).json({
        success: true,
        result: result.rows,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error: error.message,
      });
    }

};

module.exports = { notify,getNotify };

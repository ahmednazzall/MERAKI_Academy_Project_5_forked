const { pool } = require("../models/db");
const { login } = require("./users");

const saveMessages = async (req, res) => {
  //   const sender = req.token.userId;
  const { message_text, receiver, sender } = req.body;
//   console.log("sender", sender);
//   console.log("receiver", receiver);

  const query = `INSERT INTO messages(sender,receiver,message_text)
  VALUES ($1,$2,$3) RETURNING*`;
  const values = [sender, receiver, message_text];
  try {
    const result = await pool.query(query, values);
    res.status(201).json({
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

const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.params;

  const query = `SELECT m.message_text,m.sender,u.profile_image ,m.created_at FROM messages m
  join users u on m.sender=u.user_id
  where (m.sender=$1 AND  m.receiver=$2 ) OR
  ( m.sender=$2 AND m.receiver=$1)
  ORDER BY m.created_at ASC
  `;
  const values = [senderId, receiverId];
  try {
    const result = await pool.query(query, values);
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

module.exports = {
  saveMessages,
  getMessages,
};

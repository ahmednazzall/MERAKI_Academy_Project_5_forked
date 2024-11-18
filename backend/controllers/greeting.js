const { pool } = require("../models/db");

const sendGreeting = async (req, res) => {
  const { senderId, recipientId, message } = req.body;

  try {
    console.log("Input values:", { senderId, recipientId, message });

    const result = await pool.query(
      "INSERT INTO greetings (sender_id, recipient_id, message) VALUES ($1, $2, $3) RETURNING *",
      [senderId, recipientId, message]
    );
    res.json(result.rows);
    return result.rows[0];
  } catch (err) {
    console.error("Error sending greeting:", err);
    throw err;
  }
};

module.exports = {
  sendGreeting,
};

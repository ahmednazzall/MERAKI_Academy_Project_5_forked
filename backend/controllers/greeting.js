const { pool } = require("../models/db");

const sendGreeting = async (req, res) => {
  const { senderId, recipientId, message } = req.body;

  if (req.user.user_id !== senderId) {
    return res.status(403).json({ message: 'You are not authorized to send this greeting' });
  }

  try {
    console.log("Input values:", { senderId, recipientId, message });

    const result = await pool.query(
      "INSERT INTO greetings (sender_id, recipient_id, message) VALUES ($1, $2, $3) RETURNING *",
      [senderId, recipientId, message]
    );

    res.status(201).json({
      success: true,
      message: 'Greeting sent successfully',
      data: result.rows[0],  
    });
    
  } catch (err) {
    console.error("Error sending greeting:", err);
    res.status(500).json({ message: 'Error sending greeting' });
  }
};


module.exports = {
  sendGreeting,
};

const { pool } = require("../models/db");

const sendGreeting = async (req, res) => {
  const {  recipientId, greeting } = req.body;
  const senderId = req.token.userId
  console.log(senderId, recipientId, greeting);
  if (req.token.userId !== senderId) {
    
    return res.status(403).json({ message: 'You are not authorized to send this greeting' });
  }

  try {
   

    const result = await pool.query(
      "INSERT INTO greetings (sender_id, recipient_id, message) VALUES ($1, $2, $3) RETURNING *",
      [senderId, recipientId, greeting]
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

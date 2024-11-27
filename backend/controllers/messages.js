const { pool } = require("../models/db");
const { login } = require("./users");

const saveMessages = async (req, res) => {
  const sender = req.token.userId;
  const { message_text, receiver } = req.body;
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

const getMessages = async(req,res) => {
  const sender = req.token.userId;
const {id}=req.params

  const query = `SELECT message_text,sender,receiver FROM messages where sender=$1 Or receiver=$1 AND receiver=$2 Or sender=$2`;
  const values = [sender, id];
    try {
        const result =await pool.query(query,values)
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
  getMessages
};

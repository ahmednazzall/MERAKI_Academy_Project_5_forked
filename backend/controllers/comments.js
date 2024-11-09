const { pool } = require("../models/db");

//create new comment
const createComment = async (req, res) => {
  const { comment, commenter, post_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO comments (comment,commenter,post_id) VALUES ($1,$2,$3) RETURNING *`,
      [comment, commenter, post_id]
    );
    res
      .status(201)
      .json({ message: "Comment created successfully", data: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating comment", error: error.message });
  }
};

// Get all comments
const getAllComments = async (req, res) => {
  const { post_id } = req.body;
  let query = `SELECT * FROM comments WHERE is_deleted=0`;
  let params = [];

  if (post_id) {
    query += `And post_id=$1`;
    params.push(post_id);
  }

  try {
    const result = await pool.query(query, params);
    res.status(200).json({
      message: "Comments retrieved successfully",
      data: result.rows,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving comments", error: error.message });
  }
};

// Get a specific comment by ID
const getCommentById = async (req, res) => {
  const { comment_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM comments WHERE comment_id = $1 AND is_deleted = 0`,
      [comment_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving comment", error: error.message });
  }
};

// Update a comment by ID
const updateCommentById = async (req, res) => {
  const { comment_id } = req.params;
  const { comment } = req.body;
  try {
    const result = await pool.query(
      `UPDATE comments SET comment = $1, updated_at = NOW() WHERE comment_id = $2 AND is_deleted = 0 RETURNING *`,
      [comment, comment_id]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Comment not found or already deleted" });
    }
    res
      .status(200)
      .json({ message: "Comment updated successfully", data: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating comment", error: error.message });
  }
};

// Delete a comment by ID
const deleteCommentById = async (req, res) => {
  const { comment_id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE comments SET is_deleted = 1 WHERE comment_id = $1 RETURNING *`,
      [comment_id]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Comment not found or already deleted" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};

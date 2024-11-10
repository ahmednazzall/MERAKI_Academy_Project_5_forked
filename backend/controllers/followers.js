const { Socket } = require("socket.io");
const { pool } = require("../models/db");


//follow a user
const followUser = async (req, res) => {
  const follower_id = req.token.userId
  const following_id  = req.params.user_id;

  try {
    const result = await pool.query(
      `INSERT INTO followers(follower_id,following_id,followed_at) VALUES($1,$2,NOW())RETURNING *`,
      [follower_id, following_id]
    );
    res.status(201).json({
      message: "User followed successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ message: "Error following user", error:error.message });
  }
};

// Unfollow a user
const unfollowUser = async (req, res) => {
  const follower_id = req.token.userId
  const following_id  = req.params.user_id;
  try {
    const result = await pool.query(
      `UPDATE followers SET is_deleted=1 WHERE follower_id=$1 AND foolowing_id=$2 AND is_deleted=0 RETURNING *`,
      [follower_id, following_id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Follow relationship not found" });
    }
    res.status(200).json({
      message: "User unfollowed successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ message: "Error unfollowing user", error });
  }
};

// Get list of followers for a user
const getFollowers = async (req, res) => {
  const  user_id  = req.params.user_id;
  try {
    const result = await pool.query(
      `SELECT * FROM followers WHERE following_id=$1 AND is_deleted=0`,
      [user_id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "No followers found" });
    }
    res.status(200).json({
      message: "Followes retrived successfully",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching followers:", error);
    res.status(500).json({ message: "Error fetching followers", error });
  }
};

// Get list of users a user is following
const getFollowing = async (req, res) => {
  const  user_id = req.params.user_id;
  try {
    const result = await pool.query(
      `SELECT * FROM followers WHERE follower_id=$1 AND is_deleted=0`,
      [user_id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "No following users found " });
    }
    res.status(200).json({
      message: "Following List retrived successfully",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching following:", error);
    res.status(500).json({ message: "Error fetching following", error });
  }
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};

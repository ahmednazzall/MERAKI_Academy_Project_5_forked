const { pool } = require("../models/db");
const { get } = require("../routes/posts");

//follow a user
const followUser = async (req, res) => {
  const follower_id = req.token.userId;
  const following_id = req.params.user_id;

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
    res
      .status(500)
      .json({ message: "Error following user", error: error.message });
  }
};

// Unfollow a user
const removeFollower = async (req, res) => {
  // const follower_id = req.token.userId;
  // const following_id = req.params.user_id;

  const following_id = req.token.userId;
  const follower_id = req.params.user_id;

  try {
    const result = await pool.query(
      `DELETE FROM followers WHERE follower_id=$1 AND following_id=$2 AND is_deleted=0 RETURNING *`,
      [follower_id, following_id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Follow relationship not found" });
    }
    res.status(200).json({
      message: "User removed from your followers successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ message: "Error unfollowing user", error });
  }
};
const unfollowUser = async (req, res) => {
  console.log("hi");

  // const following_id = req.token.userId;
  // const follower_id = req.params.user_id;

  const follower_id = req.token.userId;
  const following_id = req.params.user_id;

  try {
    const result = await pool.query(
      `DELETE FROM followers WHERE follower_id=$1 AND following_id=$2 AND is_deleted=0 RETURNING *`,
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
  const user_id = req.params.user_id;
  const query = ` SELECT f.following_id,f.follower_id,u.user_name,u.first_name,u.last_name  FROM followers f 
      INNER JOIN users u ON f.follower_id=u.user_id
      WHERE f.following_id=$1 AND f.is_deleted=0 
     `;
  try {
    const result = await pool.query(query, [user_id]);
    if (result.rowCount === 0) {
      return res.status(200).json({
        message: "No followers found",
        result: result.rows,
      });
    }
    res.status(200).json({
      message: "Followes retrived successfully",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching followers:", error);
    res
      .status(500)
      .json({ message: "Error fetching followers", error: error.message });
  }
};

// Get list of users a user is following
const getAllFollowers = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const result = await pool.query(
      `   SELECT
    DATE(followed_at) AS day,
    COUNT(DISTINCT follower_id) AS new_followers,
    SUM(COUNT(DISTINCT follower_id)) OVER (ORDER BY DATE(followed_at)) AS cumulative_followers
      FROM followers
        GROUP BY
          DATE(followed_at)
          ORDER BY
          day;`
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "No following users found " });
    }
    res.status(200).json({
      message: "Following List retrieved successfully",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching following:", error);
    res.status(500).json({ message: "Error fetching following", error });
  }
};

const getFollowing = async (req, res) => {
  const { id } = req.params;
  const query = `
  SELECT f.following_id,f.follower_id,u.user_name,u.first_name,u.last_name FROM followers f 
      INNER JOIN users u ON f.following_id=u.user_id
      WHERE f.follower_id=$1 AND f.is_deleted=0`;

  try {
    const result = await pool.query(query, [id]);

    if (result.rows.length) {
      res.status(200).json({
        message: "Following List retrieved successfully",
        data: result.rows,
      });
    } else {
      res
        .status(200)
        .json({ message: "No following users found ", data: result.rows });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching following", err: error.message });
  }
};

// const getPostsByFollowers = (req,res)=>{
//   const follower_id = req.params.follower_id
//   const query = `SELECT * FROM followers INNER JOIN
//   users ON followers.following_id = users.user_id
//   OR followers.follower_id = users.user_id
//   INNER JOIN posts ON users.user_id = posts.user_id
//   WHERE followers.follower_id = $1 AND posts.is_deleted=$2
//   `
//   pool.query(query,[follower_id,0]).then((result)=>{
//     console.log(result.rows);

const getPostsByFollowers = (req, res) => {
  const id = req.params.userId;

  const query = `SELECT * FROM posts p
JOIN users u ON p.user_id = u.user_id
WHERE (p.user_id =$1
   OR p.user_id IN (
       SELECT following_id
       FROM followers
       WHERE follower_id =$1
       ))
       and p.is_deleted=0
   
ORDER BY p.created_at DESC;`;
  pool
    .query(query, [id])
    .then((result) => {
      res.status(200).json({
        message: "posts for user and following users ",
        data: result.rows,
      });
    })
    .catch((error) => {
      console.log(error);

      res.status(500).json({ message: "Error", err: error.message });
    });
};

module.exports = {
  followUser,
  removeFollower,
  getFollowers,
  getAllFollowers,
  getFollowing,
  unfollowUser,
  getPostsByFollowers,
};

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
  // console.log("hi");

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
  const query = ` SELECT * FROM followers f 
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

// Get list of followers for admin panel
const getAllFollowers = async (req, res) => {
  const user_id = req.params.user_id;
  const query = ` SELECT
    DATE(followed_at) AS day,
    COUNT(DISTINCT follower_id) AS new_followers,
    SUM(COUNT(DISTINCT follower_id)) OVER (ORDER BY DATE(followed_at)) AS cumulative_followers
      FROM followers
        GROUP BY
          DATE(followed_at)
          ORDER BY
          day;`;
  try {
    const result = await pool.query(query);
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
  SELECT * FROM followers f 
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

const getUserProfile = async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(400).json({
      success: false,
      message: "Authorization token must be provided.",
    });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const { user_id } = req.params; // ID المستخدم المطلوب جلب ملفه الشخصي

    // Fetch the user's privacy settings
    const privacyQuery = `SELECT profile_visibility FROM privacy_settings WHERE u_id = $1`;
    const privacyResult = await pool.query(privacyQuery, [user_id]);

    if (privacyResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found or privacy settings not configured.",
      });
    }

    const profileVisibility = privacyResult.rows[0].profile_visibility;

    // If the profile is private, check if the requester is a friend
    if (profileVisibility === "private") {
      const friendshipQuery = `
        SELECT * FROM followers
        WHERE follower_id = $1 AND following_id = $2 AND is_deleted = 0
      `;
      const friendshipResult = await pool.query(friendshipQuery, [
        decoded.userId, // الشخص الذي يطلب عرض الملف الشخصي
        user_id, // الشخص الذي يتم عرض ملفه الشخصي
      ]);

      if (friendshipResult.rows.length === 0) {
        return res.status(403).json({
          success: false,
          message: "Access denied. This profile is private.",
        });
      }
    }

    // Fetch the user's profile details (e.g., name, bio, etc.)
    const userProfileQuery = `
      SELECT user_id, user_name, bio, created_at
      FROM users WHERE user_id = $1
    `;
    const userProfileResult = await pool.query(userProfileQuery, [user_id]);

    if (userProfileResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      userProfile: userProfileResult.rows[0],
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user profile.",
      error: error.message,
    });
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
  getUserProfile,
  getPostsByFollowers,
};

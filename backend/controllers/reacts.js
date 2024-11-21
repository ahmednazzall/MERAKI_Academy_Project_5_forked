const { pool } = require("../models/db");

const toggleLike = async (req, res) => {
  const { postId } = req.params;
  const userId = req.token.userId;

  try {
    //if user already like the post
    const existingLike = await pool.query(
      "SELECT * FROM likes WHERE userId=$1 AND postId=$2",
      [userId, postId]
    );
    if (existingLike.rows.length > 0) {
      //if like exist, remove it (unlike)
      await pool.query("DELETE FROM likes WHERE userId=$1 AND postId=$2", [
        userId,
        postId,
      ]);

      return res.status(200).json({
        message: "Post Unliked Successfully",
      });
    } else {
      //if like does not exist , add it
      await pool.query("INSERT INTO likes  (userId,postId) VALUES ($1,$2)", [
        userId,
        postId,
      ]);
      return res.status(201).json({
        message: "Post Liked Successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

const getLikes = async (req, res) => {
  const { postId } = req.params;
  const userId = req.token.userId;

  try {
    const likesData = await pool.query(
      `SELECT u.user_id AS user_id, u.user_name AS user_name FROM likes l 
       INNER JOIN users u ON l.userId = u.user_id 
       WHERE l.postId = $1`,
      [postId]
    );

    const userLiked = likesData.rows.some((like) => like.user_id === userId);

    res.status(200).json({
      postId: postId,
      count: likesData.rows.length,
      users: likesData.rows.map((like) => like.user_name),
      isLiked: userLiked,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

const gitAllLikes= async(req,res)=>{
  const query=`SELECT * FROM likes`

  try {
    const result= await pool.query(query)
    res.status(200).json({
      success:true,
      message:"All likes on all posts",
      likes:result.rows
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
      error
    })
  }
}
module.exports = { toggleLike, getLikes,gitAllLikes };

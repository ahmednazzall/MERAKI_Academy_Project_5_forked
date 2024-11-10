const { pool } = require("../models/db");
const createPost = async (req, res) => {
  const { body, image, video } = req.body;
  const user_id = req.token.userId;

  const query = `INSERT INTO POSTS (body , image , video , user_id) VALUES ($1,$2,$3,$4)`;
  const data = [body, image, video, user_id];
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Post Created Successfully",
      });
    })
    .catch((error) => {
      console.log(error);

      res.status(500).json({
        success: false,
        message: "error",
        err: error,
      });
    });
};

const getAllPosts = (req, res) => {
  const query = `SELECT * FROM posts INNER JOIN users ON posts.user_id = users.user_id WHERE posts.is_deleted=$1`;
  pool
    .query(query, [0])
    .then((result) => {
      if (result.rows.length) {
        res.status(200).json({
          success: true,
          message: "Valid Move",
          Posts: result.rows,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "No Posts Yet",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "InValid Move",
        err: error,
      });
    });
};

const getPostById = (req, res) => {
  const postId = req.params.post_id;
  const query = `SELECT * FROM posts INNER JOIN users ON posts.user_id = users.user_id WHERE post_id = $1 AND posts.is_deleted=$2`;
  pool
    .query(query, [postId, 0])
    .then((result) => {
      if (result.rows.length) {
        res.status(200).json({
          success: true,
          message: "Valid Move",
          Post: result.rows,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Post Not Found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "InValid Move",
        err: error,
      });
    });
};

const getPostByUser = (req, res) => {
  const userId = req.params.user_id;
  const query = `SELECT * FROM posts INNER JOIN users ON posts.user_id = users.user_id WHERE posts.user_id = $1 AND posts.is_deleted=$2`;

  pool
    .query(query, [userId, 0])
    .then((result) => {
      if (result.rows.length) {
        res.status(200).json({
          success: true,
          message: "Valid Move",
          Post: result.rows,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `The User With ID ${userId} Have No Posts Yet`,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "InValid Move",
        err: error,
      });
    });
};

const updatePostById = (req, res) => {
  const postId = req.params.post_id;
  const { body, image, video } = req.body;
  const values=[ body || null, image || null , video || null,postId]
  const query = `UPDATE posts SET body=COALESCE($1,body) , updated_at =COALESCE(now() , updated_at) , image=COALESCE($2,image),video=COALESCE($3,video) WHERE post_id = $4 RETURNING *`;
  pool
    .query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Valid Move",
        UpdatedPost: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "InValid Move",
        err: error,
      });
    });
};
const SoftDeletePostById = (req, res) => {
  const postId = req.params.post_id;
  const query = `UPDATE posts SET is_deleted = 1 WHERE post_id = $1 RETURNING *`;
  pool
    .query(query, [postId])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Valid Move",
        DeletedPost: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "InValid Move",
        err: error,
      });
    });
};
const hardDeletedPostById = (req, res) => {
  const postId = req.params.post_id;
  const query = `DELETE FROM posts WHERE post_id = $1 RETURNING *`;
  pool
    .query(query, [postId])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Valid Move",
        DeletedPost: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "InValid Move",
        err: error,
      });
    });
};
module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getPostByUser,
  updatePostById,
  SoftDeletePostById,
  hardDeletedPostById,
};

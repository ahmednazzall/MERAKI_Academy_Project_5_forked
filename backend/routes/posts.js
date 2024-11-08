const express = require("express");
const postsRouter = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  getPostByUser,
  updatePostById,
  deletePostById,
} = require("../controllers/posts");
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

module.exports = postsRouter;

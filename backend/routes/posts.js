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

postsRouter.post('/' , authentication , createPost)
module.exports = postsRouter;


/* http://localhost:5000/posts
    Don't Forget the Token !!!!!!!!!!!
{
    "body":"test"
}
*/
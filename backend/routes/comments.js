const express = require("express");
const commentsRouter = express.Router();
const {
  createComment,
  getAllComments,
  getCommentByPostId,
  getCommentById,
  updateCommentById,
  deleteCommentById,
} = require("../controllers/comments");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// Route to create a new comment
commentsRouter.post("/:post_id", authentication, createComment);

// Route to get all comments (public, or optionally protected if needed)
commentsRouter.get("/",authentication, getAllComments);

//Get Comment By PostId
commentsRouter.get("/:post_id/post",authentication, getCommentByPostId);

// Route to get a specific comment by ID
commentsRouter.get("/:comment_id/comment",authentication, getCommentById);

// Route to update a specific comment by ID
commentsRouter.put(
  "/:comment_id",
  authentication,
  updateCommentById
);

// Route to delete a specific comment by ID
commentsRouter.delete(
  "/:comment_id",
  authentication,
  deleteCommentById
);
module.exports = commentsRouter;

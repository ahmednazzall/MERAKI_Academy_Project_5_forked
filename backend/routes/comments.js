const express = require("express");
const commentsRouter = express.Router();
const {
  createComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
} = require("../controllers/comments");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// Route to create a new comment
commentsRouter.post("/", authentication, createComment);

// Route to get all comments (public, or optionally protected if needed)
commentsRouter.get("/", getAllComments);

// Route to get a specific comment by ID
commentsRouter.get("/:comment_id", getCommentById);

// Route to update a specific comment by ID
commentsRouter.put(
  "/:comment_id",
  authentication,
  authorization,
  updateCommentById
);

// Route to delete a specific comment by ID
commentsRouter.delete(
  "/:comment_id",
  authentication,
  authorization,
  deleteCommentById
);
module.exports = commentsRouter;

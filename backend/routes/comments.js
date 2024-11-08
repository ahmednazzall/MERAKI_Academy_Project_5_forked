const express = require("express");
const commentsRouter = express.Router();
const {
  createComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
} = require("../controllers/comments");
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

module.exports = commentsRouter;

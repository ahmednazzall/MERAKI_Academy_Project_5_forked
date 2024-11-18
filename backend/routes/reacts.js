const express = require("express");
const reactsRouter = express.Router();
const { toggleLike, getLikes } = require("../controllers/reacts");
const authentication = require("../middleware/authentication");

reactsRouter.post("/:postId/like", authentication, toggleLike);
reactsRouter.get("/:postId/likes", authentication, getLikes);

module.exports = reactsRouter;

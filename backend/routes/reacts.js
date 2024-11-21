const express = require("express");
const reactsRouter = express.Router();
const { toggleLike, getLikes,gitAllLikes } = require("../controllers/reacts");
const authentication = require("../middleware/authentication");

reactsRouter.post("/:postId/like", authentication, toggleLike);
reactsRouter.get("/:postId/likes", authentication, getLikes);
reactsRouter.get("/likesAll", authentication, gitAllLikes);

module.exports = reactsRouter;

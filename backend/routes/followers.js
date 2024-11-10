const express = require("express");
const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} = require("../controllers/followers");
const authentication = require("../middleware/authentication");
const followerRouter = express.Router();


// Route to follow a user
followerRouter.post("/follow",authentication,followUser)


// Route to unfollow a user
followerRouter.post("/unfollow",authentication,unfollowUser)


// Route to get followers of a user
followerRouter.get('/:user_id/follower',authentication, getFollowers);

// Route to get users a user is following
followerRouter.get('/:user_id/following',authentication, getFollowing);


//test in postman example:
// {
//     "follower_id": 1,
//     "following_id": 2
//   }
  
module.exports = followerRouter;

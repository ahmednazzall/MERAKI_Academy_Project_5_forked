const express = require("express");
const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} = require("../controllers/followers");
const followerRouter = express.Router();


// Route to follow a user
followerRouter.post("/follow",followUser)


// Route to unfollow a user
followerRouter.post("/unfollow",unfollowUser)


// Route to get followers of a user
followerRouter.get('/:user_id/follower', getFollowers);

// Route to get users a user is following
followerRouter.get('/:user_id/following', getFollowing);


//test in postman example:
// {
//     "follower_id": 1,
//     "following_id": 2
//   }
  
module.exports = followerRouter;

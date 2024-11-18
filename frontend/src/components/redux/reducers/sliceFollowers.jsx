import { createSlice } from "@reduxjs/toolkit";

export const followerSlice = createSlice({
  name: "followers",
  initialState: {
    myFollowers: [],
    following: [],
  },
  reducers: {
    setFollowers: (state, action) => {
      state.myFollowers = action.payload;
    },
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
    addFollower: (state, action) => {
      state.myFollowers.push(payload.action);
    },
    unFollow: (state, action) => {
      const newFollowing = state.following.filter((elem, ind) => {
        return elem.following_id != action.payload;
      });

      state.following = newFollowing;
    },
    removeFollower: (state, action) => {        
      const newFollowers = state.myFollowers.filter((elem) => {
        console.log(elem);
        
        return elem.follower_id !== action.payload;
      });
       state.myFollowers = newFollowers;
    },
  },
});
export const {
  setFollowers,
  setFollowing,
  removeFollower,
  addFollower,
  unFollow,
} = followerSlice.actions;
export default followerSlice.reducer;

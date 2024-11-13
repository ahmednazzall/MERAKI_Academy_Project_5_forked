import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/sliceUser"
import  postsReducer  from "./reducers/slicePosts";
import  followerReducer  from "./reducers/sliceFollowers";

const store=configureStore({
    reducer:{
        users:userReducer,
        posts:postsReducer,
        followers:followerReducer
    }
})


export default store
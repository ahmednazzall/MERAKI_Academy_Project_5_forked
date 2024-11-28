import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/sliceUser"
import  postsReducer  from "./reducers/slicePosts";
import  followerReducer  from "./reducers/sliceFollowers";
import authReducer from "./reducers/auth";
import commentReducer from "./reducers/sliceComments";
const store=configureStore({
    reducer:{
        auth:authReducer,
        users:userReducer,
        posts:postsReducer,
        followers:followerReducer,
        comments:commentReducer,
       
    }
})


export default store